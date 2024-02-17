import { Set } from "../store/services/setlistFm";

/**
 * Flatten sets (which contain arrays of songs) into a simple array of songs
 * @param sets The sets to extract song names from
 * @returns The array of song names from the sets
 */
export const getSongNamesFromSets = (sets: Set[]): string[] => {
  return sets.reduce<string[]>((acc, curr) => {
    if (!curr.song?.length) return acc;
    const setSongs: string[] = curr.song.map((x) => x.name).filter((y: string | undefined): y is string => !!y);
    acc.push(...setSongs);
    return acc;
  }, []);
};
