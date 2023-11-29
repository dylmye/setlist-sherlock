import React, { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Appbar, Divider } from "react-native-paper";

import SetlistSearchbar from "../../components/SetlistSearchbar";
import {
  Get10SearchSetlistsApiArg,
  Setlist,
  setlistFmApi,
} from "../../store/services/setlistFm";
import SetlistListItem from "../../components/SetlistListItem";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import SearchHeader from "../../components/SearchHeader";
import SearchFilterModal from "../../components/SearchFilterModal";

const Search = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [trigger, result] = setlistFmApi.useLazyGet10SearchSetlistsQuery();

  const [searchParams, setSearchParams] = useState<Get10SearchSetlistsApiArg>(
    {},
  );
  const [filterModalVisible, setFilterVisible] = useState(false);
  const hasAdvancedFilters = useMemo(
    () => Object.keys(searchParams).length > 1 && !!searchParams.artistName,
    [searchParams],
  );
  const safeAreaEdges = useMemo<Edge[]>(() => {
    const initial = ["top", "left", "right"] as Edge[];
    if (filterModalVisible) {
      initial.push("bottom");
    }
    return initial;
  }, [filterModalVisible]);

  const onSearch = (newQuery: string) => {
    setSearchParams({
      ...searchParams,
      artistName: newQuery,
    });
  };

  useEffect(() => {
    if (params?.query && !searchParams?.artistName) {
      onSearch(params.query);
    }
  }, []);

  useEffect(() => {
    trigger(searchParams);
  }, [searchParams]);

  const ListHeader = () => (
    <SearchHeader
      hasAdvancedFilters={hasAdvancedFilters}
      initialQuery={searchParams?.artistName}
      onSearch={onSearch}
      loading={result?.isFetching}
      onPressFilter={() => setFilterVisible(true)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={safeAreaEdges}>
      <Stack.Screen options={{ title: "Search Results", headerShown: false }} />
      <FlatList<Setlist>
        data={result?.currentData?.setlist}
        renderItem={({ item }) => <SetlistListItem {...item} showDate />}
        keyExtractor={(s) => `search-result-setlist-${s.id}`}
        ItemSeparatorComponent={() => <Divider horizontalInset />}
        ListHeaderComponent={<ListHeader />}
      />
      <SearchFilterModal
        visible={filterModalVisible}
        onDismiss={() => setFilterVisible(false)}
        initialFilters={{}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Search;
