import { openURL } from "expo-linking";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useCallback } from "react";

import { SPOTIFY_USERNAME_STORAGE_KEY } from "../store/oauth-configs/spotify";
import {
  appleMusicApi,
  useCreateNewLibraryPlaylistMutation,
} from "../store/services/appleMusic";
import { Set, Setlist } from "../store/services/setlistFm";
import {
  spotifyApi,
  usePostPlaylistsByPlaylistIdTracksMutation,
  usePostUsersByUserIdPlaylistsMutation,
  usePutPlaylistsByPlaylistIdFollowersMutation,
} from "../store/services/spotify";

interface SongNameItem {
  artist: string;
  song: string;
}
/**
 * Flatten sets (which contain arrays of songs) into a simple array of songs
 * @param sets The sets to extract song names from
 * @param artistName The name of the artist to fall back to
 * @returns The array of song names from the sets
 */
export const getSongNamesFromSets = (
  sets: Set[],
  artistName: string,
): SongNameItem[] => {
  return sets.reduce<SongNameItem[]>((acc, curr) => {
    if (!curr.song?.length) return acc;
    const setSongs: SongNameItem[] = curr.song
      .filter((x) => !!x.name)
      .map((x) => ({
        artist: x?.cover?.name ?? artistName,
        song: x.name!,
      }));
    acc.push(...setSongs);
    return acc;
  }, []);
};

/**
 * Convert a setlist into a Spotify Playlist. Gets the entity IDs for the tracks via search,
 * then creates a playlist and adds the tracks to it.
 * @param setlist The setlist to transform to a playlist
 * @returns Whether the operation was successful
 */
export const useGenerateSpotifyPlaylistFromSongs = (
  setlist: Setlist,
): (() => Promise<boolean>) => {
  const [spotifySearchTrigger] = spotifyApi.useLazySearchQuery();
  const [createPlaylistTrigger] = usePostUsersByUserIdPlaylistsMutation();
  const [addTracksToPlaylistTrigger] =
    usePostPlaylistsByPlaylistIdTracksMutation();
  const [spotifyMeTrigger] = spotifyApi.useLazyGetMeQuery();
  const [followPlaylistTrigger] =
    usePutPlaylistsByPlaylistIdFollowersMutation();

  return useCallback(async () => {
    const getTrackIds = async (): Promise<string[]> => {
      if (!setlist?.sets?.set) {
        return [];
      }
      const songNames = getSongNamesFromSets(
        setlist.sets.set,
        setlist?.artist?.name!,
      );
      const spotifyTrackIds: string[] = [];
      for (const songName of songNames) {
        try {
          const res = await spotifySearchTrigger(
            {
              limit: 1,
              type: ["track"],
              q: `artist:${songName.artist} track:${songName.song}`,
            },
            false,
          );
          const trackResults = res.data?.tracks?.items;
          if (trackResults?.length) {
            spotifyTrackIds.push(trackResults[0].id!);
          }
        } catch (e) {
          console.error(
            `Unable to fetch track ${songName.song} for setlist ${setlist?.id}:`,
            e,
          );
          break;
        }
      }
      return spotifyTrackIds;
    };
    const setSpotifyUsername = async (): Promise<void> => {
      const existingUsername = await getItemAsync(SPOTIFY_USERNAME_STORAGE_KEY);
      if (!existingUsername) {
        try {
          const usernameRes = await spotifyMeTrigger();
          await setItemAsync(
            SPOTIFY_USERNAME_STORAGE_KEY,
            // panic! at! the! endpoint!
            usernameRes!.data!.id!,
          );
        } catch (e) {
          console.error("Unable to get current user's ID", e);
        }
      }
    };
    const getPlaylistId = async (): Promise<string | null | undefined> => {
      const userId = await getItemAsync(SPOTIFY_USERNAME_STORAGE_KEY);

      if (!userId) {
        console.error("Unable to create playlist - user ID empty");
        return null;
      }

      try {
        const res = await createPlaylistTrigger({
          userId,
          body: {
            name: `${setlist.artist?.name} live at ${setlist.venue?.name}`,
            description: `Setlist from ${setlist.artist?.name}'s ${setlist.eventDate} gig at ${setlist.venue?.name}. Get Setlist Sherlock: https://onelink.to/yefmaw - Source: ${setlist.url}`,
          },
        }).unwrap();
        return res.id;
      } catch (e) {
        console.error("Unable to create playlist", e);
        return null;
      }
    };
    const addTracksToPlaylist = async (
      playlistId: string,
      trackIds: string[],
    ): Promise<boolean> => {
      const uris = trackIds.map((x) => `spotify:track:${x}`);
      try {
        await addTracksToPlaylistTrigger({
          playlistId,
          body: {
            uris,
          },
        });
        return true;
      } catch (e) {
        console.error("Unable to add tracks to playlist", e);
        return false;
      }
    };
    const followPlaylist = async (playlistId: string): Promise<boolean> => {
      try {
        await followPlaylistTrigger({
          playlistId,
          body: {
            public: true,
          },
        });
        return true;
      } catch (e) {
        console.error("Unable to follow playlist", e);
        return false;
      }
    };

    const trackIds = await getTrackIds();
    if (!trackIds.length) {
      console.error("Couldn't create playlist - no tracks found");
      return false;
    }
    await setSpotifyUsername();
    const playlistId = await getPlaylistId();
    if (!playlistId) {
      console.error(
        "Couldn't create playlist - empty playlist creation failed",
      );
      return false;
    }
    const success = await addTracksToPlaylist(playlistId, trackIds);
    if (success) {
      await followPlaylist(playlistId);
      await openURL(`https://open.spotify.com/playlist/${playlistId}`);
    }

    return success;
  }, [setlist]);
};

export const useGenerateAppleMusicPlaylistFromSongs = (
  setlist: Setlist,
): (() => Promise<boolean>) => {
  const [appleMusicSearchTrigger] = appleMusicApi.useLazySearchQuery();
  const [addCreatePlaylistWithTracksTrigger] =
    useCreateNewLibraryPlaylistMutation();

  return useCallback(async () => {
    const getTrackIds = async (): Promise<string[]> => {
      if (!setlist?.sets?.set) {
        return [];
      }
      const songNames = getSongNamesFromSets(
        setlist.sets.set,
        setlist?.artist?.name!,
      );
      const trackIds: string[] = [];
      for (const songName of songNames) {
        try {
          const res = await appleMusicSearchTrigger(
            `"${songName.artist}" - "${songName.song}"`,
            false,
          );
          const trackResults = res.data?.results?.songs?.data;
          if (trackResults?.length) {
            trackIds.push(trackResults[0].id!);
          }
        } catch (e) {
          console.error(
            `Unable to fetch track ${songName.song} for setlist ${setlist?.id}:`,
            e,
          );
          break;
        }
      }
      return trackIds;
    };
    const createPlaylistWithTrackIds = async (
      trackIds: string[],
    ): Promise<string | null> => {
      try {
        const res = await addCreatePlaylistWithTracksTrigger({
          name: `${setlist.artist?.name} live at ${setlist.venue?.name}`,
          description: `Setlist from ${setlist.artist?.name}'s ${setlist.eventDate} gig at ${setlist.venue?.name}. Get Setlist Sherlock: https://onelink.to/yefmaw - Source: ${setlist.url}`,
          songIds: trackIds,
        }).unwrap();
        return res.data?.[0]?.href;
      } catch (e) {
        console.error("Unable to create playlist", e);
        return null;
      }
    };

    const trackIds = await getTrackIds();
    if (!trackIds.length) {
      console.error("Couldn't create playlist - no tracks found");
      return false;
    }
    const playlistUrl = await createPlaylistWithTrackIds(trackIds);
    if (playlistUrl) {
      await openURL(playlistUrl);
    }
    return !!playlistUrl;
  }, [setlist]);
};
