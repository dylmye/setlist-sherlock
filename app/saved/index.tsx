import { FlatList, View } from "react-native";
import { Stack } from "expo-router";

import { useAppSelector } from "../../hooks/store";
import { selectSavedSetlists } from "../../store/saved/slice";
import SetlistListItem from "../../components/SetlistListItem";
import NoSavedSetlistsCard from "../../components/NoSavedSetlistsCard";

/** List of saved setlists marked by user */
const SavedSetlists = () => {
  const setlists = useAppSelector(selectSavedSetlists);
  return (
    <View>
      <Stack.Screen
        options={{ title: "Saved setlists" }}
      />
      <FlatList
        data={setlists}
        renderItem={({ item }) => <SetlistListItem {...item} showDate />}
        ListEmptyComponent={<NoSavedSetlistsCard />}
      />
    </View>
  )
};

export default SavedSetlists;
