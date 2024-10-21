import { format, parse } from "date-fns";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

import { Setlist } from "../../store/services/setlistFm";

type SetlistData = Pick<Setlist, "id" | "artist" | "venue"> &
  Partial<Pick<Setlist, "eventDate">>;

interface SetlistListItemProps extends SetlistData {
  showDate?: boolean;
}

/** Simple display item for an indivdual setlist from search results, etc */
const SetlistListItem = ({
  id,
  artist,
  venue,
  eventDate,
  showDate = false,
}: SetlistListItemProps) => {
  const showState = ["US", "CA"].includes(venue?.city?.country?.code ?? "");
  const stateText = showState ? `, ${venue?.city?.stateCode}` : "";
  const formattedDate =
    eventDate && format(parse(eventDate, "dd-MM-y", new Date()), "do MMM y");

  const venueText = venue
    ? `${venue?.name}, ${venue?.city?.name}${stateText}`
    : "";

  return (
    <List.Item
      title={artist?.name}
      titleStyle={style.title}
      description={`${
        showDate ? `${formattedDate} ${venueText ? `\u2022` : ""} ` : ""
      }${venueText}`}
      right={(props) => <List.Icon {...props} icon="chevron-right" />}
      onPress={() => router.navigate(`/setlist/${id}`)}
    />
  );
};

const style = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
});

export default SetlistListItem;
