import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Appbar } from "react-native-paper";

import SetlistSearchbar from "../SetlistSearchbar";

interface SearchHeaderProps {
  hasAdvancedFilters: boolean;
  initialQuery?: string;
  onSearch: (newQuery: string) => void;
  onPressFilter: () => void;
  loading: boolean;
}

/** Top content for Search FlatList */
const SearchHeader = ({
  hasAdvancedFilters,
  initialQuery,
  onSearch,
  onPressFilter,
  loading,
}: SearchHeaderProps) => (
  <View style={styles.container}>
    <Appbar.BackAction onPress={() => router.back()} isLeading />
    <SetlistSearchbar
      style={styles.searchInput}
      initialQuery={initialQuery}
      onSearch={onSearch}
      loading={loading}
    />
    <Appbar.Action icon={hasAdvancedFilters ? "filter" : "filter-outline"} onPress={onPressFilter} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "row",
  },
  searchInput: {
    // marginBottom: 16,
    flex: 1,
  },
});

export default SearchHeader;
