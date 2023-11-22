import { StyleSheet, View } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FAB, Text } from "react-native-paper";
import * as Linking from "expo-linking";

import { useGet10SetlistBySetlistIdQuery } from "../../store/services/setlistFm";
import SetlistEmptyCard from "../../components/SetlistEmptyCard";
import SetlistSectionList from "../../components/SetlistSectionList";
import SetlistMetadataList from "../../components/SetlistMetadataList";

/** View for setlist set, metadata, links */
const SetlistDetails = () => {
  const { setlistId } = useLocalSearchParams<{ setlistId: string }>();
  const { data: setlist, isLoading } = useGet10SetlistBySetlistIdQuery({
    setlistId: setlistId!,
  });

  const setlistEmpty = !isLoading && !setlist?.sets?.set?.length;

  const Header = () => <SetlistMetadataList {...setlist} style={styles.metadataCard} />;
  const Footer = () => (
    <View style={styles.footer}>
      <Link asChild href={setlist?.url ?? "https://setlist.fm"}>
        <Text style={styles.footerText} variant="bodySmall">
          Source: {setlist?.artist?.name!} setlist on setlist.fm
        </Text>
      </Link>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: setlist ? `${setlist?.artist?.name} setlist` : "" }}
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
  // loadState: {
  //   minHeight: 150,
  //   display: "flex",
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  emptySetlistCard: {
    margin: 16,
  },
  metadataCard: {
    margin: 16,
  },
  footer: {
    margin: 16,
    marginBottom: 32,
  },
  footerText: {
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 32,
    right: 32,
  },
});

export default SetlistDetails;
