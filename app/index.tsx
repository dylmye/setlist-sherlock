import { StyleSheet, ListRenderItem, RefreshControl } from "react-native";
import { Stack } from "expo-router";
import { Divider, Layout, List, Text } from "@ui-kitten/components";

import { useGet10SearchSetlistsQuery } from "../store/services/setlistFm";
import { Setlist } from "../store/services/setlistFm";
import SetlistListItem from "../components/SetlistListItem";

const Home = () => {
  const {
    data: latestSetlists,
    refetch: refetchSetlists,
    isFetching: isFetchingSetlists,
  } = useGet10SearchSetlistsQuery({ date: "15-11-2023" });

  const renderSetlist: ListRenderItem<Setlist> = ({ item }) => (
    <SetlistListItem {...item} />
  );

  return (
    <Layout style={styles.container}>
      <Stack.Screen options={{ title: "Setlist Sherlock" }} />
      <Text category="h4" style={styles.title}>Latest Setlists</Text>
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
  }
});

export default Home;
