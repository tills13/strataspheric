import differenceInDays from "date-fns/differenceInDays";
import isSameDay from "date-fns/isSameDay";
import startOfDay from "date-fns/startOfDay";

import { CalendarEvent } from ".";
import { parseTimestamp } from "../../utils/datetime";

/**
 * Represents an event's clipped span within a single week row.
 * dayStart / dayEnd are 0-indexed day-of-week positions within the row (0 = Sunday).
 */
interface EventSpan {
  id: string;
  dayStart: number; // 0–6, clamped to the row
  dayEnd: number; // 0–6, clamped to the row (inclusive)
}

/**
 * Assigns a track index (0-based) to each event for a single week row.
 *
 * Events are sorted by their start day within the row (earlier first), then by
 * duration (longer first) as a tiebreak so multi-day events claim lower tracks.
 * Each event is placed on the lowest track where it doesn't overlap any already-
 * placed event. Two events overlap if their day ranges intersect within the row.
 *
 * @param events  All events that are visible anywhere in this week row.
 * @param rowDates The 7 Date objects for Sun–Sat of this row (index 0–6).
 * @returns A Map from event id → track index (0-based).
 */
export function assignTracks(
  events: CalendarEvent[],
  rowDates: Date[],
): Map<string, number> {
  const rowStart = startOfDay(rowDates[0]);
  const rowEnd = startOfDay(rowDates[6]);

  // Build clipped spans for every event visible in this row
  const spans: EventSpan[] = [];

  for (const event of events) {
    const eventStart = startOfDay(parseTimestamp(event.startDate));
    const eventEnd = startOfDay(parseTimestamp(event.endDate));

    // Skip if the event doesn't touch this row at all
    if (eventEnd < rowStart || eventStart > rowEnd) continue;

    // Clamp to the row boundaries
    const clampedStart = eventStart < rowStart ? rowStart : eventStart;
    const clampedEnd = eventEnd > rowEnd ? rowEnd : eventEnd;

    const dayStart = differenceInDays(clampedStart, rowStart);
    const dayEnd = differenceInDays(clampedEnd, rowStart);

    spans.push({ id: event.id, dayStart, dayEnd });
  }

  // Sort: earlier start first; longer duration first as tiebreak
  spans.sort((a, b) => {
    if (a.dayStart !== b.dayStart) return a.dayStart - b.dayStart;
    return b.dayEnd - b.dayStart - (a.dayEnd - a.dayStart); // longer first
  });

  const assignments = new Map<string, number>();
  // For each track, store the furthest dayEnd placed on it so far
  const trackEnds: number[] = [];

  for (const span of spans) {
    // Find the lowest track where this span doesn't overlap
    let assigned = -1;
    for (let t = 0; t < trackEnds.length; t++) {
      // Overlap check: two spans overlap if one starts before the other ends.
      // trackEnds[t] is the dayEnd (inclusive) of the last event on track t.
      if (span.dayStart > trackEnds[t]) {
        assigned = t;
        trackEnds[t] = span.dayEnd;
        break;
      }
    }

    if (assigned === -1) {
      // No existing track fits; open a new one
      assigned = trackEnds.length;
      trackEnds.push(span.dayEnd);
    }

    assignments.set(span.id, assigned);
  }

  return assignments;
}

/**
 * For a given day within a week row, returns the number of events that are
 * assigned to tracks >= maxVisibleTracks (i.e. hidden due to overflow).
 */
export function countOverflow(
  events: CalendarEvent[],
  date: Date,
  trackAssignments: Map<string, number>,
  maxVisibleTracks: number,
): number {
  let count = 0;
  for (const event of events) {
    const track = trackAssignments.get(event.id);
    if (track === undefined || track < maxVisibleTracks) continue;

    // Only count once per event per day it *starts* or wraps from previous week
    const eventStart = startOfDay(parseTimestamp(event.startDate));
    const isStartDay = isSameDay(eventStart, date);
    const isWrapDay = date.getDay() === 0 && eventStart < startOfDay(date);

    if (isStartDay || isWrapDay) {
      count++;
    }
  }
  return count;
}
