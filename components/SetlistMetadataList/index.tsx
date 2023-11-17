import React, { useMemo } from "react";
import { ListRenderItem } from "react-native";
import { format, parse } from "date-fns";
import { Card, Icon, List, ListItem } from "@ui-kitten/components";
import * as Linking from "expo-linking";

import { Setlist } from "../../store/services/setlistFm";
import SetlistMetadataItem from "./SetlistMetadataItem";
import { getMapsAddressFromVenue } from "../../utils/geo";

interface SetlistMetadataListProps
  extends Pick<Setlist, "artist" | "venue" | "eventDate" | "tour"> {}

const SetlistMetadataList = ({
  artist,
  venue,
  eventDate,
  tour,
}: SetlistMetadataListProps) => {
  const formattedEventDate = useMemo(
    () =>
      eventDate
        ? format(parse(eventDate, "d-M-y", new Date()), "do MMM y")
        : "unknown",
    [eventDate]
  );
  const data = useMemo<SetlistMetadataItem[]>(() => {
    const d: SetlistMetadataItem[] = [
      {
        key: "date",
        title: "Date",
        value: formattedEventDate,
        iconName: "calendar-outline",
      },
      {
        key: "artist-name",
        title: "Artist",
        value: artist?.name ?? "unknown",
        internalLink: `artist/${artist?.mbid}`,
        iconName: "star-outline",
        externalLink: artist?.url,
      },
    ];

    if (tour?.name) {
      d.push({
        key: "tour",
        title: "Tour",
        value: tour?.name ?? "unknown",
        iconName: "car-outline",
      });
    }

    if (venue?.name) {
      d.push({
        key: "venue",
        title: "Venue",
        value: venue?.name,
        iconName: "home-outline",
        externalLink: venue?.url,
      });
      d.push({
        key: "venue-location",
        title: "Location",
        value: `${venue?.city?.name}, ${
          venue?.city?.state ?? venue?.city?.country?.name
        }`,
        iconName: "navigation-outline",
        externalLink: getMapsAddressFromVenue(venue),
      });
    }

    return d;
  }, [formattedEventDate]);

  const renderItem: ListRenderItem<SetlistMetadataItem> = ({ item }) => (
    <ListItem
      title={item.value}
      accessoryLeft={(props) =>
        item?.iconName ? <Icon {...props} name={item.iconName} /> : <></>
      }
      accessoryRight={(props) =>
        item?.externalLink || item?.internalLink ? (
          <Icon {...props} name="chevron-right-outline" />
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
    <Card>
      <List data={data} renderItem={renderItem} />
    </Card>
  );
};

export default SetlistMetadataList;
