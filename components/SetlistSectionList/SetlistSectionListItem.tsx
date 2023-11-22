import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { Song } from "../../store/services/setlistFm";

interface SetlistSectionListItemProps {
  song: Song;
}

/** Indivial item for setlist song item */
const SetlistSectionListItem = memo(({ song }: SetlistSectionListItemProps) => {
  const description = () => {
    let d = [];
    if (song.with) {
      d.push(`with ${song.with.name}`);
    }
    if (song.cover) {
      d.push(`${song.cover.name} cover`);
    }
    if (song.tape) {
      d.push("Pre-recorded");
    }
    if (song.info) {
      d.push(`${song.info}`);
    }

    return d.join(`\n`);
  };

  return (
    <List.Item
      title={song.name}
      titleStyle={styles.title}
      description={description()}
    />
  );
});

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
});

export default SetlistSectionListItem;
