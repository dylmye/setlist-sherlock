import { Text } from "react-native-paper";
import { useAppSelector } from "../../hooks/store";
import { selectSavedSetlists } from "../../store/saved/slice";

/** List of saved setlists marked by user */
const SavedSetlists = () => {
  const setlists = useAppSelector(selectSavedSetlists);

  // @TODO: add view for saved setlists with save/unsave button, navigation to setlist, title

  return (
    <Text variant="bodyMedium">slay!</Text>
  )
};

export default SavedSetlists;
