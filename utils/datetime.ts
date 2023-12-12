export function formatDateForDatetime(d: Date) {
  return d.toISOString().substring(0, 16);
}
