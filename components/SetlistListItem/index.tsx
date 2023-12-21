import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { List } from "react-native-paper";

import { Setlist } from "../../store/services/setlistFm";
import { format, parse } from "date-fns";

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
  const showState = venue?.city?.country?.code === "US";
  const stateText = showState ? `, ${venue?.city?.stateCode}` : "";
  const formattedDate =
    eventDate && format(parse(eventDate, "dd-MM-y", new Date()), "do MMM y");

  return (
    <List.Item
      title={artist?.name}
      titleStyle={style.title}
      description={`${
        showDate ? `${formattedDate} \u2022 ` : ""
      }${venue?.name}, ${venue?.city?.name}${stateText}`}
      right={(props) => <List.Icon {...props} icon="chevron-right" />}
      onPress={() => router.push(`/setlist/${id}`)}
    />
  );
};

const style = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
});

export default SetlistListItem;
