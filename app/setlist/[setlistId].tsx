import React, { useState } from "react";
import { Share, StyleSheet, ToastAndroid, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Divider,
  FAB,
  List,
  Text,
} from "react-native-paper";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { getItem } from "expo-secure-store";

import { useGet10SetlistBySetlistIdQuery } from "../../store/services/setlistFm";
import { BEARER_TOKEN_STORAGE_KEY as SPOTIFY_BEARER_TOKEN_STORAGE_KEY } from "../../store/oauth-configs/spotify";
import SetlistEmptyCard from "../../components/SetlistEmptyCard";
import SetlistSectionList from "../../components/SetlistSectionList";
import SetlistMetadataList from "../../components/SetlistMetadataList";
import { useGeneratePlaylistFromSongs } from "../../utils/playlists";
import SpotifyCreatingModal from "../../components/SpotifyCreatingModal";
import { isAfter, parse } from "date-fns";

/** View for setlist set, metadata, links */
const SetlistDetails = () => {
  const { setlistId } = useLocalSearchParams<{ setlistId: string }>();
  const [spotifyLoading, setSpotifyLoading] = useState(false);
  const { data: setlist, isLoading } = useGet10SetlistBySetlistIdQuery({
    setlistId: setlistId!,
  });
  const createSpotifyPlaylistFromSongs = useGeneratePlaylistFromSongs(setlist!);

  const setlistEmpty = !isLoading && !setlist?.sets?.set?.length;
  const setlistInPast =
    setlist?.eventDate &&
    isAfter(new Date(), parse(setlist.eventDate, "d-M-y", new Date()));
  const hasSpotifySetup = getItem(SPOTIFY_BEARER_TOKEN_STORAGE_KEY);
  const showPlaylistAddButton = !isLoading && !setlistEmpty && hasSpotifySetup;

  const onShareSetlistUrl = async () => {
    await Share.share(
      {
        url: setlist?.url ?? `https://setlist.fm/`,
        message: `Here's what ${setlist?.artist?.name} played at ${setlist?.venue?.name}: ${setlist?.url}`,
      },
      {
        dialogTitle: "Share this setlist",
      },
    );
  };

  const onExportToSpotify = async () => {
    setSpotifyLoading(true);
    const success = await createSpotifyPlaylistFromSongs();
    ToastAndroid.show(
      success
        ? "Your playlist has been created!"
        : "Unable to create Spotify playlist. Please try again.",
      ToastAndroid.SHORT,
    );
    setSpotifyLoading(false);
  };

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
      {setlistInPast && (
        // https://www.concertarchives.org/past-concert-search-engine?utf8=%E2%9C%93&search=[artist name here]+[yyyy-mm-dd]
        <List.Item
          title="Find photos and videos of this gig"
          description="From Concert Archives"
          titleNumberOfLines={3}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
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
                  onPress={onExportToSpotify}
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
      <SpotifyCreatingModal visible={spotifyLoading} />
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
