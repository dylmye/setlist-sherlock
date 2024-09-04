import React, { useMemo } from "react";
import { StyleSheet, SectionList, SectionBase } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { format } from "date-fns";
import { Divider, Text } from "react-native-paper";

import { useGet10SearchSetlistsQuery, Setlist } from "../store/services/setlistFm";
import SetlistListItem from "../components/SetlistListItem";
import HomepageHeader from "../components/HomepageHeader";

interface HomepageSection extends SectionBase<Setlist> {
  index: number; // Stupid `renderSectionHeader` doesn't provide index so we DIY
  title: string;
  data: Setlist[];
  loading: boolean;
}

/** Entry point for users - latest setlists view default */
const Home = () => {
  // setlist-fm API uses UK date format, two digit padded, explicitly instead of RFC y-M-d format
  const today = useMemo(() => format(new Date(), "dd-MM-y"), []);
  const {
    data: latestSetlists,
    isFetching: isFetchingSetlists,
  } = useGet10SearchSetlistsQuery({ date: today });

  // @TODO: replace with real data source
  const forYouSetlists: Setlist[] = [];

  const sections: HomepageSection[] = [
    {
      index: 0,
      title: "For You",
      key: "for-you",
      data: forYouSetlists ?? [],
      loading: true,
    },
    {
      index: 1,
      title: "Latest",
      key: "latest",
      data: latestSetlists?.setlist ?? [],
      loading: isFetchingSetlists,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Stack.Screen
        options={{ title: "Homepage", headerShown: false }}
      />
      <SectionList<Setlist, HomepageSection>
        sections={sections}
        renderSectionHeader={({ section }) =>
          section?.index === 0 ? (
            <HomepageHeader showForYouHeader={!!section?.data?.length} />
          ) : (
            <Text variant="headlineSmall" style={styles.title}>
              {section.title}
            </Text>
          )
        }
        renderItem={({ item }) => <SetlistListItem {...item} />}
        keyExtractor={({ id }) => `homepage-setlist-${id}`}
        ItemSeparatorComponent={() => <Divider horizontalInset />}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
});

export default Home;
