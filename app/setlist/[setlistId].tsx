import { StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Button, Icon, Layout, Spinner } from "@ui-kitten/components";
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

  return (
    <Layout style={styles.container}>
      <Stack.Screen
        options={{ title: setlist ? `${setlist?.artist?.name} setlist` : "" }}
      />
      {setlistEmpty ? (
        <>
          <SetlistMetadataList {...setlist} />
          <SetlistEmptyCard style={styles.emptySetlistCard} />
        </>
      ) : !isLoading ? (
        <SetlistSectionList
          sets={setlist?.sets?.set!}
          header={<SetlistMetadataList {...setlist} />}
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
