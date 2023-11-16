import { StyleSheet, ListRenderItem } from "react-native";
import { Stack, router } from "expo-router";
import { Button, Divider, Layout, List, Text } from "@ui-kitten/components";

import { useGet10SearchSetlistsQuery } from "../store/services/setlistFm";
import { Setlist } from "../store/services/setlistFm";
import SetlistListItem from "../components/SetlistListItem";
import { useMemo } from "react";
import { format } from "date-fns";

/** Entry point for users - latest setlists view default */
const Home = () => {
  // setlist-fm API uses UK date format explicitly instead of RFC y-M-d format
  const today = useMemo(() => format(new Date(), "d-M-y"), []);
  const {
    data: latestSetlists,
    refetch: refetchSetlists,
    isFetching: isFetchingSetlists,
  } = useGet10SearchSetlistsQuery({ date: today });

  const renderSetlist: ListRenderItem<Setlist> = ({ item }) => (
    <SetlistListItem {...item} />
  );

  return (
    <Layout style={styles.container}>
      <Stack.Screen options={{ title: "Setlist Sherlock" }} />
      <Text category="h6" style={styles.title}>
        Latest Setlists
      </Text>
      <Button onPress={() => router.push(`/setlist/2ba1a46e`)}>Test Setlist</Button>
      <List<Setlist>
        data={latestSetlists?.setlist}
        renderItem={renderSetlist}
        keyExtractor={(s) => `latest-setlist-${s.id}`}
        ItemSeparatorComponent={Divider}
        style={styles.container}
        onRefresh={() => refetchSetlists()}
        refreshing={isFetchingSetlists}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 8,
  },
});

export default Home;
