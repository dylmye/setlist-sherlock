import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import SetlistSearchbar from "../SetlistSearchbar";

/** Top content for Homepage FlatList */
const HomepageHeader = () => (
  <View style={styles.container}>
    <SetlistSearchbar style={styles.searchInput} redirectToSearchPage />
    <Text variant="headlineSmall" style={styles.title}>
      Latest Setlists
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold'
  },
});

export default HomepageHeader;
