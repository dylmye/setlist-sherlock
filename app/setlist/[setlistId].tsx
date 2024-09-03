import React, { useEffect, useState } from "react";
import { Share, StyleSheet, View } from "react-native";
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
import { isAfter, parse } from "date-fns";
import { getNetworkStateAsync } from "expo-network";
import { Image } from "expo-image";

import { useGet10SetlistBySetlistIdQuery } from "../../store/services/setlistFm";
import SetlistEmptyCard from "../../components/SetlistEmptyCard";
import SetlistSectionList from "../../components/SetlistSectionList";
import SetlistMetadataList from "../../components/SetlistMetadataList";
import AddToPlaylistAppbarAction from "../../components/AddToPlaylistAppbarAction";
import { openBrowserAsync } from "expo-web-browser";

/** View for setlist set, metadata, links */
const SetlistDetails = () => {
  const { setlistId } = useLocalSearchParams<{ setlistId: string }>();
  const { data: setlist, isLoading } = useGet10SetlistBySetlistIdQuery({
    setlistId: setlistId!,
  });
  const [networkIsAvailable, setNetworkState] = useState(false);

  const setlistEmpty = !isLoading && !setlist?.sets?.set?.length;
  const setlistInPast =
    setlist?.eventDate &&
    // Adding the Z specifies that the date provided to us is in UTC.
    // It's not, but it's much easier than determining the TZ by the
    // event location.
    isAfter(new Date(), parse(`${setlist.eventDate} Z`, "d-M-y X", new Date()));

  const onShareSetlistUrl = async () => {
    await Share.share(
      {
        url: setlist?.url ?? `https://setlist.fm/`,
        message: setlistInPast
          ? `Here's what ${setlist?.artist?.name} played at ${setlist?.venue?.name}: ${setlist?.url}`
          : setlist?.url,
      },
      {
        dialogTitle: "Share this setlist",
      },
    );
  };

  const Header = () => (
    <SetlistMetadataList {...setlist} style={styles.metadataCard} />
  );
  const Footer = () => (
    <View style={styles.footer}>
      {setlist?.info && (
        <>
          <Divider style={styles.footerDivider} />
          <Text style={styles.infoText} variant="bodyMedium">
            {setlist?.info}
          </Text>
          <Link asChild href={setlist?.url ?? "https://setlist.fm"}>
            <Text style={styles.sourceText} variant="bodySmall">
              Source: {setlist?.artist?.name!} setlist on setlist.fm
            </Text>
          </Link>
        </>
      )}

      <List.Section>
        <List.Subheader style={styles.listSubheader}>
          Across the web
        </List.Subheader>
        {setlistInPast && (
          <List.Item
            title="Find photos and videos from this gig"
            description="From Concert Archives"
            left={(props) => <List.Icon color={props.color} icon="camera" />}
            titleNumberOfLines={3}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={async () =>
              openBrowserAsync(
                `https://www.concertarchives.org/past-concert-search-engine?utf8=%E2%9C%93&search=${encodeURIComponent(
                  setlist?.artist?.name!,
                )}+${setlist?.eventDate}#concert-table`,
              )
            }
          />
        )}
        <List.Item
          title={
            !setlistInPast
              ? "Find tickets for this gig"
              : `Find upcoming ${setlist?.artist?.name} tour dates`
          }
          description="On Songkick"
          left={() => (
            <List.Icon
              icon={({ color, size }) => (
                <Image
                  source="songkick"
                  style={{ width: size, height: size }}
                  tintColor={color}
                />
              )}
            />
          )}
          titleNumberOfLines={3}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={async () =>
            openBrowserAsync(
              !setlistInPast
                ? `https://www.songkick.com/search?utf8=%E2%9C%93&query=${encodeURIComponent(
                    setlist?.artist?.name!,
                  )}%20${setlist?.venue?.name}&type=events`
                : `https://www.songkick.com/search?utf8=%E2%9C%93&query=${encodeURIComponent(
                    setlist?.artist?.name!,
                  )}&type=artists`,
            )
          }
        />
      </List.Section>
    </View>
  );

  useEffect(() => {
    const setNetworkStatus = async () => {
      const state = await getNetworkStateAsync();
      setNetworkState(state?.isInternetReachable ?? false);
    };

    setNetworkStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: setlist ? `${setlist?.artist?.name} setlist` : "",
          headerRight: () =>
            setlist && (
              <>
                <Appbar.Action icon="star" accessibilityLabel="Add this setlist to your favourites" />
                <AddToPlaylistAppbarAction
                  setlist={setlist}
                  show={!isLoading && networkIsAvailable && !setlistEmpty}
                />
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
  footerDivider: {
    marginBottom: 24,
  },
  listSubheader: {
    fontWeight: "bold",
  },
  listIconImage: {
    width: 22,
    height: 22,
  },
});

export default SetlistDetails;
