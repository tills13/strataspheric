import { getString } from "./formdata";

export function formatDateForDatetime(d: Date | number) {
  if (typeof d === "number") {
    d = parseTimestamp(d);
  }

  return d.toLocaleString("sv").substring(0, 16);
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
