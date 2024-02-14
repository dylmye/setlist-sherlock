import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Divider, Menu, Text } from "react-native-paper";

import SetlistSearchbar from "../SetlistSearchbar";
import { router } from "expo-router";

/** Top content for Homepage FlatList */
const HomepageHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <SetlistSearchbar style={styles.searchInput} redirectToSearchPage />
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
              accessibilityLabel={`${
                menuVisible ? "Close" : "Open"
              } Settings Menu`}
            />
          }
        >
          <Menu.Item onPress={() => {
            closeMenu();
            router.navigate("/settings");
          }} title="Settings" />
          <Menu.Item onPress={() => {}} title="About" />
        </Menu>
      </View>
      <Text variant="headlineSmall" style={styles.title}>
        Latest Setlists
      </Text>
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
});

export default HomepageHeader;
