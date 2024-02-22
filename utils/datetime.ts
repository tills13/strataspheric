import addDays from "date-fns/addDays";

import { getString } from "./formdata";

export function formatDateForDatetime(d: Date | number | string) {
  if (typeof d === "string") {
    if (d.length === 16) {
      return d;
    }

    d = parseInt(d, 10);
  }

  if (typeof d === "number") {
    d = parseTimestamp(d);
  }

  return d.toLocaleString("sv").substring(0, 16);
}

export function formatTimestampForSql(timestamp: number) {
  if (timestamp > 9_999_999_999) {
    timestamp /= 1000;
  }

  return timestamp;
}

export function parseTimestamp(timestampSeconds: number) {
  if (timestampSeconds <= 9_999_999_999) {
    timestampSeconds *= 1000;
  }

  return new Date(timestampSeconds);
}

export function patchTimezoneOffset(fd: FormData, fieldName: string) {
  const date = getString(fd, fieldName);
  const rawTzOffset = new Date().getTimezoneOffset() / 60;
  const isNegative = rawTzOffset >= 0;
  const tzOffset =
    (isNegative ? "-" : "") + rawTzOffset.toString().padStart(2, "0") + ":00";

  fd.set(fieldName, date + tzOffset);
}

export function dateFromDayAndWeekIdx(
  startOfMonth: Date,
  weekIdx: number,
  dayIdx: number,
  firstDayInMonth: number,
) {
  const offset = weekIdx * 7 + dayIdx - firstDayInMonth;
  return addDays(startOfMonth, offset);
}
