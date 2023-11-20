import { SectionList, SectionListData, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

import { Set, Song } from "../../store/services/setlistFm";
import SetlistSectionListItem from "./SetlistSectionListItem";

interface SetlistSectionListProps {
  sets: Set[];
  header: JSX.Element;
  footer: JSX.Element;
}

/** List songs within a setlist, as well as act/part headers */
const SetlistSectionList = ({
  sets,
  header,
  footer,
}: SetlistSectionListProps) => {
  const sections: SectionListData<Song>[] = sets?.map((x, i) => ({
    title: x.name ?? x.encore === 1 ? "Encore" : "Setlist",
    data: x.song ?? [],
  }));

  if (!sections) {
    return <></>;
  }

  return (
    <SectionList<Song>
      sections={sections}
      keyExtractor={(x, i) => `song-${x.name}-${i}`}
      renderItem={({ item }) => <SetlistSectionListItem song={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Layout style={styles.sectionHeader}>
          <Text category="h6">
            {title}
          </Text>
        </Layout>
      )}
      stickySectionHeadersEnabled
      ListHeaderComponent={header}
      ListFooterComponent={footer}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 16,
  },
});

export default SetlistSectionList;
