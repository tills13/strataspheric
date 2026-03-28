"use client";

import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import { useCallback, useEffect, useRef, useState } from "react";

export interface DateRange {
  start: Date;
  end: Date;
}

interface RangeSelectionState {
  /** The anchor date where the drag started */
  anchor: Date | null;
  /** The current hover date during drag */
  current: Date | null;
  /** Whether a drag is in progress */
  isDragging: boolean;
}

export interface RangeSelectionHandlers {
  onDayMouseDown: (date: Date) => void;
  onDayMouseEnter: (date: Date) => void;
  isDayInSelection: (date: Date) => boolean;
  isSelectionStart: (date: Date) => boolean;
  isSelectionEnd: (date: Date) => boolean;
}

/**
 * Hook managing click-and-drag date range selection across calendar cells.
 * Lives at the Calendar/AmenitiesBookingCalendar level so drags can span
 * multiple CalendarWeek rows.
 *
 * @param onRangeSelected - called with the committed { start, end } range on mouseup
 */
export function useRangeSelection(
  onRangeSelected?: (range: DateRange) => void,
): RangeSelectionHandlers | null {
  const [state, setState] = useState<RangeSelectionState>({
    anchor: null,
    current: null,
    isDragging: false,
  });

  // Keep a ref so the mouseup handler (attached to window) can read latest state
  const stateRef = useRef(state);
  stateRef.current = state;

  const onRangeSelectedRef = useRef(onRangeSelected);
  onRangeSelectedRef.current = onRangeSelected;

  const getRange = useCallback((anchor: Date, current: Date): DateRange => {
    if (isBefore(anchor, current) || isSameDay(anchor, current)) {
      return { start: anchor, end: current };
    }
    return { start: current, end: anchor };
  }, []);

  useEffect(() => {
    if (!onRangeSelected) return;

    function handleMouseUp() {
      const { anchor, current, isDragging } = stateRef.current;

      if (!isDragging || !anchor) {
        setState({ anchor: null, current: null, isDragging: false });
        return;
      }

      const resolved = current ?? anchor;
      const range = getRange(anchor, resolved);

      onRangeSelectedRef.current?.(range);
      setState({ anchor: null, current: null, isDragging: false });
    }

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [getRange, onRangeSelected]);

  const onDayMouseDown = useCallback((date: Date) => {
    setState({ anchor: date, current: date, isDragging: true });
  }, []);

  const onDayMouseEnter = useCallback((date: Date) => {
    setState((prev) => (prev.isDragging ? { ...prev, current: date } : prev));
  }, []);

  const isDayInSelection = useCallback(
    (date: Date) => {
      const { anchor, current, isDragging } = state;
      if (!isDragging || !anchor || !current) return false;
      const { start, end } = getRange(anchor, current);
      return (
        (isAfter(date, start) || isSameDay(date, start)) &&
        (isBefore(date, end) || isSameDay(date, end))
      );
    },
    [state, getRange],
  );

  const isSelectionStart = useCallback(
    (date: Date) => {
      const { anchor, current, isDragging } = state;
      if (!isDragging || !anchor || !current) return false;
      const { start } = getRange(anchor, current);
      return isSameDay(date, start);
    },
    [state, getRange],
  );

  const isSelectionEnd = useCallback(
    (date: Date) => {
      const { anchor, current, isDragging } = state;
      if (!isDragging || !anchor || !current) return false;
      const { end } = getRange(anchor, current);
      return isSameDay(date, end);
    },
    [state, getRange],
  );

  if (!onRangeSelected) return null;

  return {
    onDayMouseDown,
    onDayMouseEnter,
    isDayInSelection,
    isSelectionStart,
    isSelectionEnd,
  };
}
