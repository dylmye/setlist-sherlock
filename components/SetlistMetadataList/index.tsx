import React, { useMemo } from "react";
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from "react-native";
import { format, parse } from "date-fns";
import * as Linking from "expo-linking";
import { Card, List } from "react-native-paper";

import { Setlist } from "../../store/services/setlistFm";
import SetlistMetadataItem from "./SetlistMetadataItem";
import { getMapsAddressFromVenue } from "../../utils/geo";

interface SetlistMetadataListProps
  extends Pick<Setlist, "artist" | "venue" | "eventDate" | "tour"> {
    style?: StyleProp<ViewStyle>;
  }

/** Card containing information about the setlist e.g. date, artist, location */
const SetlistMetadataList = ({
  artist,
  venue,
  eventDate,
  tour,
  style,
}: SetlistMetadataListProps) => {
  const formattedEventDate = useMemo(
    () =>
      eventDate
        ? format(parse(eventDate, "d-M-y", new Date()), "do MMM y")
        : "unknown",
    [eventDate],
  );
  const data = useMemo<SetlistMetadataItem[]>(() => {
    const d: SetlistMetadataItem[] = [
      {
        key: "date",
        title: "Date",
        value: formattedEventDate,
        iconName: "calendar-star",
      },
      {
        key: "artist-name",
        title: "Artist",
        value: artist?.name ?? "unknown",
        internalLink: `artist/${artist?.mbid}`,
        iconName: "account-star",
        externalLink: artist?.url,
      },
    ];

    if (tour?.name) {
      d.push({
        key: "tour",
        title: "Tour",
        value: tour?.name ?? "unknown",
        iconName: "badge-account",
      });
    }

    if (venue?.name) {
      d.push({
        key: "venue",
        title: "Venue",
        value: venue?.name,
        iconName: "stadium-variant",
        externalLink: venue?.url,
      });
      d.push({
        key: "venue-location",
        title: "Location",
        value: `${venue?.city?.name}, ${
          venue?.city?.state ?? venue?.city?.country?.name
        }`,
        iconName: "navigation-variant",
        externalLink: getMapsAddressFromVenue(venue),
      });
    }

    return d;
  }, [formattedEventDate]);

  const renderItem: ListRenderItem<SetlistMetadataItem> = ({ item }) => (
    <List.Item
      title={item.value}
      left={(props) =>
        item?.iconName ? <List.Icon {...props} icon={item.iconName} /> : <></>
      }
      right={(props) =>
        item?.externalLink || item?.internalLink ? (
          <List.Icon {...props} icon="chevron-right" />
        ) : (
          <></>
        )
      }
      onPress={() => {
        if (item?.externalLink) {
          Linking.openURL(item?.externalLink);
        }
      }}
    />
  );

  return (
    <Card mode="contained" style={style}>
      <Card.Content>
        <FlatList<SetlistMetadataItem> data={data} renderItem={renderItem} />
      </Card.Content>
    </Card>
  );
};

export default SetlistMetadataList;
