import React, { useCallback } from "react";
import { Share, StyleSheet, View } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Appbar, FAB, Text } from "react-native-paper";
import * as Linking from "expo-linking";
import { getItem } from "expo-secure-store";

import { useGet10SetlistBySetlistIdQuery } from "../../store/services/setlistFm";
import { spotifyApi, usePostUsersByUserIdPlaylistsMutation } from "../../store/services/spotify";
import { BEARER_TOKEN_STORAGE_KEY as SPOTIFY_BEARER_TOKEN_STORAGE_KEY } from "../../store/oauth-configs/spotify";
import SetlistEmptyCard from "../../components/SetlistEmptyCard";
import SetlistSectionList from "../../components/SetlistSectionList";
import SetlistMetadataList from "../../components/SetlistMetadataList";
import { getSongNamesFromSets } from "../../utils/playlists";

/** View for setlist set, metadata, links */
const SetlistDetails = () => {
  const { setlistId } = useLocalSearchParams<{ setlistId: string }>();
  const { data: setlist, isLoading } = useGet10SetlistBySetlistIdQuery({
    setlistId: setlistId!,
  });
  const [spotifySearchTrigger] =
    spotifyApi.useLazySearchQuery();
  const [trigger] = usePostUsersByUserIdPlaylistsMutation();

  const onShareSetlistUrl = async () => {
    await Share.share({
      url: setlist?.url ?? `https://setlist.fm/`,
      message: `Here's what ${setlist?.artist?.name} played at ${setlist?.venue?.name}: ${setlist?.url}`,
    });
  };

  const setlistEmpty = !isLoading && !setlist?.sets?.set?.length;
  const hasSpotifySetup = getItem(SPOTIFY_BEARER_TOKEN_STORAGE_KEY);
  const showPlaylistAddButton = !setlistEmpty && hasSpotifySetup;

  const createSpotifyPlaylistFromSongs = useCallback(async () => {
    const getTrackIds = async (): Promise<string[]> => {
      if (!setlist?.sets?.set) {
        return [];
      }
      const songNames = getSongNamesFromSets(setlist.sets.set);
      const spotifyTrackIds: string[] = [];
      for (const songName of songNames) {
        try {
          const res = await spotifySearchTrigger(
            {
              limit: 1,
              type: ["track"],
              q: `artist:${setlist?.artist?.name} track:${songName}`,
            },
            false,
          );
          const trackResults = res.data?.tracks?.items;
          if (trackResults?.length) {
            spotifyTrackIds.push(trackResults[0].id!);
          }
        } catch (e) {
          console.error(
            `Unable to fetch track ${songName} for setlist ${setlist?.id}:`,
            e,
          );
          break;
        }
      }
      return spotifyTrackIds;
    };

    const trackIds = await getTrackIds();
  }, [setlist]);

  const Header = () => (
    <SetlistMetadataList {...setlist} style={styles.metadataCard} />
  );
  const Footer = () => (
    <View style={styles.footer}>
      {setlist?.info && (
        <Text style={styles.infoText} variant="bodyMedium">
          {setlist?.info}
        </Text>
      )}
      <Link asChild href={setlist?.url ?? "https://setlist.fm"}>
        <Text style={styles.sourceText} variant="bodySmall">
          Source: {setlist?.artist?.name!} setlist on setlist.fm
        </Text>
      </Link>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: setlist ? `${setlist?.artist?.name} setlist` : "",
          headerRight: (props) => (
            <>
              {showPlaylistAddButton && (
                <Appbar.Action
                  icon="playlist-plus"
                  onPress={createSpotifyPlaylistFromSongs}
                  accessibilityLabel="Add this setlist to your Spotify"
                />
              )}
              <Appbar.Action
                icon="share"
                onPress={onShareSetlistUrl}
                accessibilityLabel="Share the link to this setlist"
              />
            </>
          ),
        }}
      />
      {setlistEmpty ? (
        <>
          <Header />
          <SetlistEmptyCard style={styles.emptySetlistCard} />
          <Footer />
        </>
      ) : !isLoading ? (
        <SetlistSectionList
          sets={setlist?.sets?.set!}
          header={<Header />}
          footer={<Footer />}
        />
      ) : (
        <ActivityIndicator animating size="large" />
      )}
      {!isLoading && (
        <FAB
          icon="pencil"
          onPress={() =>
            Linking.openURL(`${setlist?.url}` ?? "https://setlist.fm")
          }
          accessibilityLabel="Edit this setlist on the Setlist FM website"
          style={styles.floatingButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptySetlistCard: {
    margin: 16,
  },
  metadataCard: {
    margin: 16,
  },
  footer: {
    margin: 16,
    marginBottom: 72,
  },
  infoText: {
    marginBottom: 4,
  },
  sourceText: {
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 32,
    right: 32,
  },
});

export default SetlistDetails;
