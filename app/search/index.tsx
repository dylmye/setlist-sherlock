import { StyleSheet } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SetlistSearchbar from "../../components/HomepageHeader/SetlistSearchbar";
import { useGet10SearchSetlistsQuery } from "../../store/services/setlistFm";

const Search = () => {
  const params = useLocalSearchParams<{ query?: string }>();

  const {} = useGet10SearchSetlistsQuery({  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Search Results", headerShown: false }} />
      <SetlistSearchbar style={styles.searchInput} initialQuery={params?.query} searchbarProps={{ onClearIconPress: () => router.back() }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    margin: 16,
  },
});

export default Search;
