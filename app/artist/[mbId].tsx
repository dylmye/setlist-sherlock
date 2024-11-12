import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { t } from "@lingui/macro";

import SetlistListItem from "../../components/SetlistListItem";
import {
  useGet10ArtistByMbidQuery,
  useGet10ArtistByMbidSetlistsQuery,
  Setlist,
} from "../../store/services/setlistFm";

/** View for artist */
const ArtistPage = () => {
  const { mbId } = useLocalSearchParams<{ mbId: string }>();
  const { data: artistData } = useGet10ArtistByMbidQuery({ mbid: mbId! });
  const {
    data: setlistsData,
    refetch,
    isFetching,
  } = useGet10ArtistByMbidSetlistsQuery({ mbid: mbId! });

  return (
    <>
      <Stack.Screen
        options={{
          title: artistData ? t`${artistData?.name}'s latest setlists` : "",
        }}
      />
      <View style={styles.container}>
        <FlatList<Setlist>
          data={setlistsData?.setlist}
          renderItem={({ item }) => (
            <SetlistListItem
              id={item?.id}
              artist={{ name: item.venue?.name }}
              eventDate={item?.eventDate}
              showDate
            />
          )}
          keyExtractor={(s) => `setlist-artist-${mbId}-${s.id}`}
          ItemSeparatorComponent={() => <Divider horizontalInset />}
          style={styles.container}
          onRefresh={() => refetch()}
          refreshing={isFetching}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ArtistPage;
