import { t } from "@lingui/macro";
import { Stack } from "expo-router";
import { FlatList, View } from "react-native";

import NoSavedSetlistsCard from "../../components/NoSavedSetlistsCard";
import SetlistListItem from "../../components/SetlistListItem";
import { useAppSelector } from "../../hooks/store";
import { selectSavedSetlists } from "../../store/saved/slice";

/** List of saved setlists marked by user */
const SavedSetlists = () => {
  const setlists = useAppSelector(selectSavedSetlists);
  return (
    <View>
      <Stack.Screen options={{ title: t`Saved setlists` }} />
      <FlatList
        data={setlists}
        renderItem={({ item }) => <SetlistListItem {...item} showDate />}
        ListEmptyComponent={<NoSavedSetlistsCard />}
      />
    </View>
  );
};

export default SavedSetlists;
