import { useLingui, Trans } from "@lingui/react/macro";
import { isAfter, parse } from "date-fns";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { getNetworkStateAsync } from "expo-network";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Share, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Appbar,
  Divider,
  FAB,
  List,
  Snackbar,
  Text,
} from "react-native-paper";

import AddToPlaylistAppbarAction from "../../components/AddToPlaylistAppbarAction";
import SetlistEmptyCard from "../../components/SetlistEmptyCard";
import SetlistMetadataList from "../../components/SetlistMetadataList";
import SetlistSectionList from "../../components/SetlistSectionList";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  unsaveSetlistById,
  selectSetlistIsSaved,
  saveSetlist,
} from "../../store/saved/slice";
import { useGet10SetlistBySetlistIdQuery } from "../../store/services/setlistFm";

/** View for setlist set, metadata, links */
const SetlistDetails = () => {
  const { t } = useLingui();
  const dispatch = useAppDispatch();
  const { setlistId } = useLocalSearchParams<{ setlistId: string }>();
  const insets = useSafeAreaInsets();

  const { data: setlist, isLoading } = useGet10SetlistBySetlistIdQuery({
    setlistId: setlistId!,
  });
  const [networkIsAvailable, setNetworkState] = useState(false);

  const [savedSnackbarVisible, setSavedSnackbarVisible] = useState(false);
  const isSaved = useAppSelector((store) =>
    selectSetlistIsSaved(store, setlistId!),
  );
  const setlistDate = setlist?.eventDate && parse(`${setlist.eventDate} Z`, "d-M-y X", new Date())
  const setlistEmpty = !isLoading && !setlist?.sets?.set?.length;
  const setlistInPast =
    setlistDate &&
    // Adding the Z specifies that the date provided to us is in UTC.
    // It's not, but it's much easier than determining the TZ by the
    // event location.
    isAfter(new Date(), setlistDate);

  const plaintextSetlistContents = useMemo<string>(() => {
    const allSets = setlist?.sets?.set;
    if (isLoading || !allSets?.length) {
      return "";
    }

    return allSets
      .map((x) => x.song!)
      .flat()
      .reduce<string[]>((acc, curr) => {
        if (!curr.name) {
          return acc;
        }
        acc.push(curr.name);
        return acc;
      }, [] as string[])
      .join(`\n`);
  }, [setlist?.sets?.set, isLoading]);

  const onShareSetlistUrl = async () => {
    const artistName = setlist?.artist?.name;
    const venueName = setlist?.venue?.name;
    const setlistUrl = setlist?.url;

    await Share.share(
      {
        url: setlist?.url ?? `https://setlist.fm/`,
        message: setlistInPast
          ? t`Here's what ${artistName} played at ${venueName}: ${setlistUrl}`
          : setlist?.url,
      },
      {
        dialogTitle: t`Share this setlist`,
      },
    );
  };

  const onCopySetlist = async () => {
    await Clipboard.setStringAsync(plaintextSetlistContents);
  };

  const Header = () => (
    <SetlistMetadataList {...setlist} style={styles.metadataCard} />
  );
  const Footer = () => {
    const artistName = setlist?.artist?.name;

    return (
      <View style={styles.footer}>
        {setlist?.info && (
          <>
            <Divider style={styles.footerDivider} />
            <Text style={styles.infoText} variant="bodyMedium">
              {setlist?.info}
            </Text>
            <Link asChild href={setlist?.url ?? "https://setlist.fm"}>
              <Text style={styles.sourceText} variant="bodySmall">
                <Trans>Source: {artistName} setlist on setlist.fm</Trans>
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
              title={t`Find photos and videos from this gig`}
              description={t`From Concert Archives`}
              left={(props) => <List.Icon color={props.color} icon="camera" />}
              titleNumberOfLines={3}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={async () =>
                openBrowserAsync(
                  `https://www.concertarchives.org/concert-search-engine?utf8=%E2%9C%93&bands_query%5B%5D=${encodeURIComponent(
                    setlist?.artist?.name!,
                  )}&band_match_type=and&single_date%5Bmonth%5D=${setlistDate.getMonth() + 1}&single_date%5Bday%5D=${setlistDate.getDate()}&single_date%5Byear%5D=${setlistDate.getFullYear()}&venue_match_type=or&location_match_type=or&user_match_type=and&sort_by=latest_date`,
                )
              }
            />
          )}
          <List.Item
            title={
              !setlistInPast
                ? t`Find tickets for this gig`
                : t`Find upcoming ${artistName} tour dates`
            }
            description={t`On Songkick`}
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
  };

  const toggleSaveState = useCallback(() => {
    if (isSaved) {
      dispatch(unsaveSetlistById(setlistId!));
      setSavedSnackbarVisible(true);
      return;
    }
    dispatch(
      saveSetlist({
        id: setlistId!,
        artist: setlist?.artist,
        eventDate: setlist?.eventDate,
        venue: setlist?.venue,
      }),
    );
    setSavedSnackbarVisible(true);
  }, [isSaved, setlistId, setlist]);

  const artistName = setlist?.artist?.name;

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
          title: setlist
            ? t({
              comment: "e.g. The Beatles setlist",
              message: `${artistName} setlist`,
            })
            : "",
          headerRight: () =>
            setlist && (
              <>
                <Appbar.Action
                  icon={isSaved ? "star" : "star-outline"}
                  accessibilityLabel={
                    isSaved
                      ? t`This setlist is in your saved list`
                      : t`Save this setlist to your saved list`
                  }
                  onPress={toggleSaveState}
                />
                <AddToPlaylistAppbarAction
                  setlist={setlist}
                  show={!isLoading && networkIsAvailable && !setlistEmpty}
                />
                <Appbar.Action
                  icon="share"
                  onPress={onShareSetlistUrl}
                  accessibilityLabel={t`Share the link to this setlist`}
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
      {!isLoading && !setlistEmpty && (
        <FAB
          icon="content-copy"
          onPress={onCopySetlist}
          accessibilityLabel={t`Copy the contents of this setlist to your clipboard`}
          style={{ ...styles.floatingButton, bottom: insets.bottom + 32 }}
        />
      )}
      <Snackbar
        visible={savedSnackbarVisible}
        onDismiss={() => setSavedSnackbarVisible(false)}
        action={
          isSaved
            ? {
              label: t`View`,
              onPress: () => {
                router.navigate("/saved");
              },
            }
            : undefined
        }
      >
        {isSaved
          ? t`Added to your saved setlists`
          : t`Removed from your saved setlists`}
      </Snackbar>
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
