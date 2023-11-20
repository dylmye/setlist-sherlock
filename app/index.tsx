import React, { useMemo } from "react";
import { StyleSheet, ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Divider, Layout, List } from "@ui-kitten/components";
import { format } from "date-fns";

import { useGet10SearchSetlistsQuery } from "../store/services/setlistFm";
import { Setlist } from "../store/services/setlistFm";
import SetlistListItem from "../components/SetlistListItem";
import HomepageHeader from "../components/HomepageHeader";

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
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <Stack.Screen
          options={{ title: "Setlist Sherlock", headerShown: false }}
        />
        <List<Setlist>
          data={latestSetlists?.setlist}
          renderItem={renderSetlist}
          keyExtractor={(s) => `latest-setlist-${s.id}`}
          ItemSeparatorComponent={Divider}
          style={styles.container}
          onRefresh={() => refetchSetlists()}
          refreshing={isFetchingSetlists}
          ListHeaderComponent={<HomepageHeader />}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
