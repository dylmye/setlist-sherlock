import { useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { deleteItemAsync, getItem } from "expo-secure-store";
import { Stack } from "expo-router";
import { Button, ButtonProps, Text, useTheme } from "react-native-paper";

import {
  USER_TOKEN_STORAGE_KEY as APPLE_MUSIC_USER_TOKEN_STORAGE_KEY,
  DEV_TOKEN_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY,
  DEV_TOKEN_EXPIRY_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_EXPIRY_STORAGE_KEY,
} from "../../store/oauth-configs/appleMusic";
import { authorise } from "../../utils/appleMusic";

const AppleMusicSettingsPage = () => {
  const theme = useTheme();

  const [hasSetUp, setSetupState] = useState(
    !!getItem(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY),
  );
  const [loading, setLoading] = useState(false);

  const onPressConnect = async () => {
    setLoading(true);
    ToastAndroid.show("Log in with Apple to continue.", ToastAndroid.SHORT);
    try {
      await authorise();
    } catch (error) {
      console.error("Authorization failed:", error);
    }
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

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Apple Music" }} />
      <View style={[styles.container, styles.centredContainer]}>
        <Text style={styles.copy} variant="bodyMedium">
          {hasSetUp
            ? "You've connected your Apple Music account. Now you can press the share button on any setlist to get your playlist!"
            : "Connect your Apple Music account to save setlists as playlists."}
        </Text>
        {hasSetUp ? (
          <Button {...buttonProps} buttonColor={theme.colors.error} onPress={onPressDisconnect}>
            Disconnect Apple Music
          </Button>
        ) : (
          <Button
          {...buttonProps}
          loading={loading}
          disabled={loading}
          onPress={onPressConnect}
        >
          Connect with Apple Music
        </Button>
        )}
      </View>
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
