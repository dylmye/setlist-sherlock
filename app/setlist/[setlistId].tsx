import { StyleSheet } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Button, Icon, Layout, Spinner, Text } from "@ui-kitten/components";
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

  const Header = () => <SetlistMetadataList {...setlist} />;
  const Footer = () => (
    <Layout style={styles.footer}>
      <Link asChild href={setlist?.url ?? "https://setlist.fm"}>
        <Text style={styles.footerText}>
          Source: {setlist?.artist?.name!} setlist on setlist.fm
        </Text>
      </Link>
    </Layout>
  );

  return (
    <Layout style={styles.container}>
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
        <Layout style={styles.loadState}>
          <Spinner />
        </Layout>
      )}
      {!isLoading && (
        <Button
          style={styles.floatingButton}
          size="giant"
          appearance="filled"
          accessoryLeft={(props) => <Icon {...props} name="edit-outline" />}
          onPress={() =>
            Linking.openURL(`${setlist?.url}` ?? "https://setlist.fm")
          }
          accessible
          accessibilityLabel="Edit this setlist on the Setlist FM website"
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadState: {
    minHeight: 150,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptySetlistCard: {
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
    borderRadius: 1000,
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 72,
    height: 72,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default SetlistDetails;
