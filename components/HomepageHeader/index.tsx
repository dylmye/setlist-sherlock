import { StyleSheet } from "react-native";
import { Icon, Input, Layout, Text } from "@ui-kitten/components";
import { router } from "expo-router";

const HomepageHeader = () => (
  <Layout style={[styles.container, styles.title]}>
    <Input
      placeholder="Search for a setlist"
      style={styles.searchInput}
      accessoryRight={(props) => <Icon {...props} name="search-outline" />}
    />
    <Text category="h6" onPress={() => router.push(`/setlist/63df2657`)}>
      Latest Setlists
    </Text>
  </Layout>
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
