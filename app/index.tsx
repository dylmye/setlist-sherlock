import React, { useMemo } from "react";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { format } from "date-fns";
import { Divider } from "react-native-paper";

import { useGet10SearchSetlistsQuery } from "../store/services/setlistFm";
import { Setlist } from "../store/services/setlistFm";
import SetlistListItem from "../components/SetlistListItem";
import HomepageHeader from "../components/HomepageHeader";

/** Entry point for users - latest setlists view default */
const Home = () => {
  // setlist-fm API uses UK date format, two digit padded, explicitly instead of RFC y-M-d format
  const today = useMemo(() => format(new Date(), "dd-MM-y"), []);
  const {
    data: latestSetlists,
    refetch: refetchSetlists,
    isFetching: isFetchingSetlists,
  } = useGet10SearchSetlistsQuery({ date: today });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen
        options={{ title: "Setlist Sherlock", headerShown: false }}
      />
      <FlatList<Setlist>
        data={latestSetlists?.setlist}
        renderItem={({ item }) => <SetlistListItem {...item} />}
        keyExtractor={(s) => `latest-setlist-${s.id}`}
        ItemSeparatorComponent={() => <Divider horizontalInset />}
        style={styles.container}
        onRefresh={() => refetchSetlists()}
        refreshing={isFetchingSetlists}
        ListHeaderComponent={<HomepageHeader />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
