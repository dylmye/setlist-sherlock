import { router } from "expo-router";
import { List } from "react-native-paper";

import { Setlist } from "../../store/services/setlistFm";

/** Simple display item for an indivdual setlist from search results, etc */
const SetlistListItem = ({ id, artist, venue }: Setlist) => {
  const showState = venue?.city?.country?.code === "US";
  const stateText = showState ? `, ${venue?.city?.stateCode}` : "";

  return (
    <List.Item
      title={artist?.name}
      description={`${venue?.name}, ${venue?.city?.name}${stateText}`}
      right={(props) => <List.Icon {...props} icon="chevron-right" />}
      onPress={() => router.push(`/setlist/${id}`)}
    />
  );
};

export default SetlistListItem;
