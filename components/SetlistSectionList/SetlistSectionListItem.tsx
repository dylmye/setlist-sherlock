import React, { useMemo } from "react";
import { ListItem } from "@ui-kitten/components";

import { Song } from "../../store/services/setlistFm";

interface SetlistSectionListItemProps {
  song: Song;
}

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

  return <ListItem title={song.name} description={description} />;
};

export default SetlistSectionListItem;
