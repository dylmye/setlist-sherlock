import { useLingui } from "@lingui/react/macro";
import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { Song } from "../../store/services/setlistFm";

interface SetlistSectionListItemProps {
  song: Song;
}

/** Indivial item for setlist song item */
const SetlistSectionListItem = memo(({ song }: SetlistSectionListItemProps) => {
  const { t } = useLingui();
  const description = () => {
    const d = [];
    if (song.with) {
      const withArtistName = song.with.name;

      d.push(
        t({
          comment:
            'Text displayed under a song with a featured guest. E.g. "with The Beatles"',
          message: `with ${withArtistName}`,
        }),
      );
    }
    if (song.cover) {
      const coverArtistName = song.cover.name;
      d.push(t`${coverArtistName} cover`);
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
