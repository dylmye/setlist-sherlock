import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { Song } from "../../store/services/setlistFm";
import { t } from "@lingui/macro";

interface SetlistSectionListItemProps {
  song: Song;
}

/** Indivial item for setlist song item */
const SetlistSectionListItem = memo(({ song }: SetlistSectionListItemProps) => {
  const description = () => {
    const d = [];
    if (song.with) {
      d.push(
        t({
          comment:
            'Text displayed under a song with a featured guest. E.g. "with The Beatles"',
          message: `with ${song.with.name}`,
        }),
      );
    }
    if (song.cover) {
      d.push(t`${song.cover.name} cover`);
    }
    if (song.tape) {
      d.push(t`Pre-recorded`);
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
      descriptionNumberOfLines={3}
    />
  );
});

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
});

export default SetlistSectionListItem;
