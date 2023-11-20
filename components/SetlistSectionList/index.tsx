import { SectionList, SectionListData, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

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
        <Surface style={styles.sectionHeader} elevation={3}>
          <Text variant="titleLarge">{title}</Text>
        </Surface>
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
