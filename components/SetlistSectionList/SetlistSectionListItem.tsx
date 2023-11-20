import React, { useMemo } from "react";
import { List } from "react-native-paper";

import { Song } from "../../store/services/setlistFm";

interface SetlistSectionListItemProps {
  song: Song;
}

/** Indivial item for setlist song item */
const SetlistSectionListItem = ({ song }: SetlistSectionListItemProps) => {
  const description = useMemo<string>(() => {
    let d = "";
    if (song.with) {
      d += `with ${song.with.name}\n`;
    }
    if (song.cover) {
      d += `${song.cover.name} cover\n`;
    }
    if (song.tape) {
      d += "Pre-recorded\n";
    }
    if (song.info) {
      d += `${song.info}`;
    }

    return d;
  }, [song]);

  return <List.Item title={song.name} description={description} />;
};

export default SetlistSectionListItem;
