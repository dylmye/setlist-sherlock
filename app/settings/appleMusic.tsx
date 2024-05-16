import { useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { deleteItemAsync, getItem } from "expo-secure-store";
import { Auth } from "@lomray/react-native-apple-music";
import { Stack } from "expo-router";
import { Button, ButtonProps } from "react-native-paper";

import {
  USER_TOKEN_STORAGE_KEY as APPLE_MUSIC_USER_TOKEN_STORAGE_KEY,
  DEV_TOKEN_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY,
  DEV_TOKEN_EXPIRY_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_EXPIRY_STORAGE_KEY,
} from "../../store/oauth-configs/appleMusic";
import { authorise } from "../../utils/appleMusic";

const AppleMusicSettingsPage = () => {
  const [hasSetUp, setSetupState] = useState(
    !!getItem(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY),
  );
  const [loading, setLoading] = useState(false);

  const onPressConnect = () => {
    setLoading(true);
    ToastAndroid.show("Log in with Apple to continue.", ToastAndroid.SHORT);
  };

  const onPressDisconnect = () => {
    setLoading(true);
    const onDelete = async () => {
      await deleteItemAsync(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY);
      await deleteItemAsync(APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY);
      await deleteItemAsync(APPLE_MUSIC_DEV_TOKEN_EXPIRY_STORAGE_KEY);
    };
    onDelete();
    setLoading(false);
    setSetupState(false);
    ToastAndroid.show(
      "Successfully disconnected from Apple Music.",
      ToastAndroid.SHORT,
    );
  };

  const buttonProps: Partial<ButtonProps> = {
    mode: "contained",
    icon: "music",
  };

  const onPress = async () => {
    try {
      await authorise();
    } catch (error) {
      console.error("Authorization failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Apple Music" }} />
      <Button {...buttonProps} onPress={onPress}>Connect with Apple Music</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centredContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  copy: {
    marginBottom: 12,
    textAlign: "center",
  },
});

export default AppleMusicSettingsPage;
