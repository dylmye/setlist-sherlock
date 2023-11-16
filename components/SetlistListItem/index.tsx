import { Icon, ListItem } from "@ui-kitten/components";

import { Setlist } from "../../store/services/setlistFm";
import { router } from "expo-router";

/** Simple display item for an indivdual setlist from search results, etc */
const SetlistListItem = ({ id, artist, venue }: Setlist) => {
  const showState = venue?.city?.country?.code === "US";
  const stateText = showState ? `, ${venue?.city?.stateCode}` : "";
  return (
    <ListItem
      title={artist?.name}
      description={`${venue?.name}, ${venue?.city?.name}${stateText}`}
      accessoryRight={(props) => <Icon {...props} name="chevron-right-outline" />}
      onPress={() => router.push(`/setlist/${id}`)}
    />
  );
};

export default SetlistListItem;
