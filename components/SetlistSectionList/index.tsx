import { SectionList, SectionListData, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

import { Set, Song } from "../../store/services/setlistFm";
import SetlistSectionListItem from "./SetlistSectionListItem";
import SetlistSectionHeader from "./SetlistSectionHeader";

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
    title: !!x.name ? x.name : x.encore === 1 ? "Encore" : "Setlist",
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
        <SetlistSectionHeader title={title} />
      )}
      stickySectionHeadersEnabled
      ListHeaderComponent={header}
      ListFooterComponent={footer}
    />
  );
};

export default SetlistSectionList;
