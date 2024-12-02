import { t } from "@lingui/macro";
import { format } from "date-fns";
import { Stack } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, SectionList, SectionBase } from "react-native";
import { Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import HomepageHeader from "../components/HomepageHeader";
import SetlistListItem from "../components/SetlistListItem";
import { useKeyboardVisible } from "../hooks/keyboard";
import {
  useGet10SearchSetlistsQuery,
  Setlist,
} from "../store/services/setlistFm";

interface HomepageSection extends SectionBase<Setlist> {
  index: number; // Stupid `renderSectionHeader` doesn't provide index so we DIY
  title: string;
  data: Setlist[];
  loading: boolean;
}

/** Entry point for users - latest setlists view default */
const Home = () => {
  const isKeyboardVisible = useKeyboardVisible();
  // setlist-fm API uses UK date format, two digit padded, explicitly instead of RFC y-M-d format
  const today = useMemo(() => format(new Date(), "dd-MM-y"), []);
  const { data: latestSetlists, isFetching: isFetchingSetlists } =
    useGet10SearchSetlistsQuery({ date: today });

  // @TODO: replace with real data source
  const forYouSetlists: Setlist[] = [];

  const sections: HomepageSection[] = [
    {
      index: 0,
      title: t`For You`,
      key: "for-you",
      data: forYouSetlists ?? [],
      loading: true,
    },
    {
      index: 1,
      title: t`Latest`,
      key: "latest",
      data: latestSetlists?.setlist ?? [],
      loading: isFetchingSetlists,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Stack.Screen options={{ title: t`Homepage`, headerShown: false }} />
      <SectionList<Setlist, HomepageSection>
        sections={sections}
        renderSectionHeader={({ section }) =>
          section?.index === 0 ? (
            <HomepageHeader
              showForYouHeader={!!section?.data?.length}
              actionButtonsHidden={isKeyboardVisible}
            />
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
