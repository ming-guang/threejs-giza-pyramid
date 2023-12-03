export function getCurrentTime(): number {
  return Date.now() % 72000;
}
