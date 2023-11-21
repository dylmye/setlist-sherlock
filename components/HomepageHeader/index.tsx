import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";

import SetlistSearchbar from "./SetlistSearchbar";

/** Top content for Homepage FlatList */
const HomepageHeader = () => (
  <View style={[styles.container, styles.title]}>
    <SetlistSearchbar style={styles.searchInput} redirectToSearchPage />
    <Text variant="headlineSmall" onPress={() => router.push(`/setlist/63df2657`)}>
      Latest Setlists
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    marginBottom: 16,
  },
  title: {
    padding: 16,
  },
});

export default HomepageHeader;
