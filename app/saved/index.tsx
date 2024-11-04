import { Stack } from "expo-router";
import { FlatList, View } from "react-native";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";

import NoSavedSetlistsCard from "../../components/NoSavedSetlistsCard";
import SetlistListItem from "../../components/SetlistListItem";
import { useAppSelector } from "../../hooks/store";
import { selectSavedSetlists } from "../../store/saved/slice";

/** List of saved setlists marked by user */
const SavedSetlists = () => {
  const { i18n } = useLingui();
  const setlists = useAppSelector(selectSavedSetlists);
  return (
    <View>
      <Stack.Screen options={{ title: t(i18n)`Saved setlists` }} />
      <FlatList
        data={setlists}
        renderItem={({ item }) => <SetlistListItem {...item} showDate />}
        ListEmptyComponent={<NoSavedSetlistsCard />}
      />
    </View>
  );
};

export default SavedSetlists;
