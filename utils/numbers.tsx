/**
 * Format a number with its ordinal,
 * e.g. 1st, 2nd, 3rd, 4th
 */
export const getNumberWithOrdinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
