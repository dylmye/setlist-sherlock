import { ScrollView, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Layout, Text } from "@ui-kitten/components";

import { useGet10SetlistBySetlistIdQuery } from "../../store/services/setlistFm";
import SetlistEmptyCard from "../../components/SetlistEmptyCard";
import SetlistSectionList from "../../components/SetlistSectionList";

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
        <SetlistEmptyCard style={styles.emptySetlistCard} />
      ) : (
        <SetlistSectionList sets={setlist?.sets?.set!} />
      )}
      <ScrollView>
        <Text category="p1">{JSON.stringify(setlist, null, 2)}</Text>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptySetlistCard: {
    margin: 16,
  },
});

export default SetlistDetails;
