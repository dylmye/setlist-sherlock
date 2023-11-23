import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Appbar, Divider } from "react-native-paper";

import SetlistSearchbar from "../../components/HomepageHeader/SetlistSearchbar";
import { Setlist, setlistFmApi } from "../../store/services/setlistFm";
import SetlistListItem from "../../components/SetlistListItem";

const Search = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [trigger, result] = setlistFmApi.useLazyGet10SearchSetlistsQuery();

  const onSearch = (newQuery: string) => {
    trigger({ artistName: newQuery });
  };

  useEffect(() => {
    if (params?.query) {
      onSearch(params.query);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Search Results", headerShown: false }} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <SetlistSearchbar
          style={styles.searchInput}
          initialQuery={params?.query}
          onSearch={onSearch}
          loading={result?.isFetching}
        />
      </Appbar.Header>
      <FlatList<Setlist>
        data={result?.currentData?.setlist}
        renderItem={({ item }) => <SetlistListItem {...item} showDate />}
        keyExtractor={(s) => `search-result-setlist-${s.id}`}
        ItemSeparatorComponent={() => <Divider horizontalInset />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    margin: 16,
    marginLeft: 0,
  },
});

export default Search;
