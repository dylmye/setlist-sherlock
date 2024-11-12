import { Stack, router, useFocusEffect } from "expo-router";
import { getItem } from "expo-secure-store";
import { useState } from "react";
import { StyleSheet, View, ListRenderItem, FlatList } from "react-native";
import { List, Text } from "react-native-paper";
import { t } from "@lingui/macro";

import { USER_TOKEN_STORAGE_KEY as APPLE_MUSIC_USER_TOKEN_STORAGE_KEY } from "../../store/oauth-configs/appleMusic";
import { BEARER_TOKEN_STORAGE_KEY as SPOTIFY_BEARER_TOKEN_STORAGE_KEY } from "../../store/oauth-configs/spotify";

interface SettingItem {
  label: string;
  value: React.ReactNode;
  onPress: () => void;
}

/** Settings controls, accessible from homepage */
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

  const [appleMusicHasSetup, setAppleMusicSetupState] = useState(
    !!getItem(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY),
  );

  const settings: SettingItem[] = [
    {
      label: "Spotify",
      value: spotifyHasSetup ? t`Connected` : t`Set up`,
      onPress: () => router.navigate("/settings/spotify"),
    },
    {
      label: "Apple Music",
      value: appleMusicHasSetup ? t`Connected` : t`Set up`,
      onPress: () => router.navigate("/settings/appleMusic"),
    },
  ];

  useFocusEffect(() => {
    setSpotifySetupState(!!getItem(SPOTIFY_BEARER_TOKEN_STORAGE_KEY));
    setAppleMusicSetupState(!!getItem(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY));
  });

  // @TODO: when there's >1 category of settings, use a SectionList instead

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: t`Settings` }} />
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
