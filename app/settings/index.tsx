import { Stack, router, useFocusEffect } from "expo-router";
import { getItem } from "expo-secure-store";
import { useState } from "react";
import { StyleSheet, View, ListRenderItem, FlatList } from "react-native";
import { List, Text } from "react-native-paper";
import { BEARER_TOKEN_STORAGE_KEY as SPOTIFY_BEARER_TOKEN_STORAGE_KEY } from "../../store/oauth-configs/spotify";

interface SettingItem {
  label: string;
  value: React.ReactNode;
  onPress: () => void;
}

const SettingsPage = () => {
  const renderSetting: ListRenderItem<SettingItem> = ({ item, index }) => (
    <List.Item
      title={item.label}
      right={(props) => <Text {...props}>{item.value}</Text>}
      onPress={item.onPress}
    />
  );

  const [spotifyHasSetup, setSpotifySetupState] = useState(
    !!getItem(SPOTIFY_BEARER_TOKEN_STORAGE_KEY),
  );

  const settings: SettingItem[] = [
    // {
    //   label: "Spotify",
    //   value: spotifyHasSetup ? "Connected" : "Set up",
    //   onPress: () => router.navigate("/settings/spotify"),
    // },
    {
      label: "Apple Music",
      value: "Set up",
      onPress: () => router.navigate("/settings/appleMusic")
    }
  ];

  useFocusEffect(() => {
    setSpotifySetupState(!!getItem(SPOTIFY_BEARER_TOKEN_STORAGE_KEY));
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Settings" }} />
      <FlatList<SettingItem> data={settings} renderItem={renderSetting} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsPage;
