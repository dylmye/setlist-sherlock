import React, { useMemo } from "react";
import { StyleSheet, ListRenderItem } from "react-native";
import { Stack, router } from "expo-router";
import { Button, Divider, Layout, List, Text } from "@ui-kitten/components";
import { format } from "date-fns";

import { useGet10SearchSetlistsQuery } from "../store/services/setlistFm";
import { Setlist } from "../store/services/setlistFm";
import SetlistListItem from "../components/SetlistListItem";

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
      <List<Setlist>
        data={latestSetlists?.setlist}
        renderItem={renderSetlist}
        keyExtractor={(s) => `latest-setlist-${s.id}`}
        ItemSeparatorComponent={Divider}
        style={styles.container}
        onRefresh={() => refetchSetlists()}
        refreshing={isFetchingSetlists}
        ListHeaderComponent={
          <Layout style={[styles.container, styles.title]}>
            <Text
              category="h6"
              onPress={() => router.push(`/setlist/63df2657`)}
            >
              Latest Setlists
            </Text>
          </Layout>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 16,
  },
});

export default Home;
