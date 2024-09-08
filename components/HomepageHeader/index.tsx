import { StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

import SetlistSearchbar from "../SetlistSearchbar";
import { router } from "expo-router";

interface Props {
  showForYouHeader: boolean;
  actionButtonsHidden: boolean;
}

/** Top content for Homepage FlatList */
const HomepageHeader = ({ showForYouHeader, actionButtonsHidden }: Props) => (
  <View style={styles.container}>
    <View style={styles.topbar}>
      <SetlistSearchbar style={styles.searchInput} redirectToSearchPage />
      {/* @TODO: transition slide/fade in/out depending on value */}
      {/* Also @TODO: add saved page that shows value of saved state! */}
      {!actionButtonsHidden && (
        <>
          <Appbar.Action
            icon="star"
            accessibilityLabel="View saved setlists"
            onPress={() => {
              router.navigate("/saved");
            }}
          />
          <Appbar.Action
            icon="cog"
            accessibilityLabel="Open Settings Menu"
            onPress={() => {
              router.navigate("/settings");
            }}
          />
        </>
      )}
    </View>
    {showForYouHeader && (
      <Text variant="headlineSmall" style={styles.title}>
        For You
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
  },
  topbar: {
    flex: 1,
    paddingBottom: 16,
    display: "flex",
    flexDirection: "row",
  },
  searchInput: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
});

export default HomepageHeader;
