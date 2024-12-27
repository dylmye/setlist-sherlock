import { useLingui } from "@lingui/react/macro";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import NoSearchResultsCard from "../../components/NoSearchResultsCard";
import SearchFilterModal from "../../components/SearchFilterModal";
import SearchHeader from "../../components/SearchHeader";
import SetlistListItem from "../../components/SetlistListItem";
import {
  Get10SearchSetlistsApiArg,
  Setlist,
  setlistFmApi,
} from "../../store/services/setlistFm";

/** Search results for setlists from user input */
const Search = () => {
  const { t } = useLingui();
  const params = useLocalSearchParams<{ query?: string; tourName?: string }>();
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

  const onSearch = (newQuery: string, extras?: Get10SearchSetlistsApiArg) => {
    setSearchParams({
      ...searchParams,
      ...extras,
      artistName: newQuery,
    });
  };

  useEffect(() => {
    if (params?.query && !searchParams?.artistName) {
      onSearch(
        params.query,
        params?.tourName ? { tourName: params?.tourName } : undefined,
      );
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
      <Stack.Screen
        options={{ title: t`Search Results`, headerShown: false }}
      />
      {/* TODO: add empty results message */}
      {/* TODO: add bottom padding for gesture displays */}
      <FlatList<Setlist>
        data={result?.currentData?.setlist}
        renderItem={({ item }) => <SetlistListItem {...item} showDate />}
        keyExtractor={(s) => `search-result-setlist-${s.id}`}
        ItemSeparatorComponent={() => <Divider horizontalInset />}
        ListHeaderComponent={<ListHeader />}
        ListEmptyComponent={<NoSearchResultsCard />}
      />
      <SearchFilterModal
        visible={filterModalVisible}
        onDismiss={(values) => {
          setFilterVisible(false);
          const filteredValues = Object.keys(
            values,
          ).reduce<Get10SearchSetlistsApiArg>((acc, curr) => {
            if (values[curr as keyof typeof values]) {
              return {
                ...acc,
                [curr]: values[curr as keyof typeof values],
              };
            }

            return acc;
          }, {});
          setSearchParams({
            ...filteredValues,
            ...(searchParams?.artistName
              ? { artistName: searchParams.artistName }
              : {}),
          });
        }}
        initialFilters={{
          cityName: "",
          year: "",
          tourName: "",
          venueName: "",
          ...searchParams,
        }}
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
