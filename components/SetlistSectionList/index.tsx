import { SectionList, SectionListData, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

import { Set, Song } from "../../store/services/setlistFm";
import SetlistSectionListItem from "./SetlistSectionListItem";

interface SetlistSectionListProps {
  sets: Set[];
}

const SetlistSectionList = ({ sets }: SetlistSectionListProps) => {
  const sections: SectionListData<Song>[] = sets?.map((x, i) => ({
    title: x.name ?? `Section ${i}`,
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
        <Text category="h6" style={styles.sectionHeader}>
          {title}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    margin: 16,
  },
});

export default SetlistSectionList;
