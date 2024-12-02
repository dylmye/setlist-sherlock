import { SectionList, SectionListData } from "react-native";

import SetlistSectionHeader from "./SetlistSectionHeader";
import SetlistSectionListItem from "./SetlistSectionListItem";
import { Set, Song } from "../../store/services/setlistFm";
import { getNumberWithOrdinal } from "../../utils/numbers";

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
  const formatTitle = (title?: string, encoreNum?: number) => {
    return title
      ? title
      : encoreNum === 1
        ? "Encore"
        : encoreNum
          ? // @TODO support i18n
            `${getNumberWithOrdinal(encoreNum)} Encore`
          : "Setlist";
  };

  const sections: SectionListData<Song>[] = sets?.map((x, i) => ({
    title: formatTitle(x.name, x.encore),
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
