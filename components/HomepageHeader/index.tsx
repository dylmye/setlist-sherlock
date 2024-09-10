import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import SetlistSearchbar from "../SetlistSearchbar";
import HeaderActionButtons from "./actionButtons";

interface Props {
  showForYouHeader: boolean;
  actionButtonsHidden: boolean;
}

/** Top content for Homepage FlatList */
const HomepageHeader = ({ showForYouHeader, actionButtonsHidden }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <SetlistSearchbar style={styles.searchInput} redirectToSearchPage />
        <HeaderActionButtons visible={!actionButtonsHidden} />
      </View>
      {showForYouHeader && (
        <Text variant="headlineSmall" style={styles.title}>
          For You
        </Text>
      )}
    </View>
  );
};

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
  actions: {
    display: "flex",
    flexDirection: "row",
  },
});

export default HomepageHeader;
