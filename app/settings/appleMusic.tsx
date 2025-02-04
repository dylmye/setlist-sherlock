import { useLingui, Trans } from "@lingui/react/macro";
import { Stack } from "expo-router";
import { deleteItemAsync, getItem } from "expo-secure-store";
import { useState } from "react";
import { Linking, StyleSheet, ToastAndroid, View } from "react-native";
import { Button, ButtonProps, Text, useTheme } from "react-native-paper";

import {
  USER_TOKEN_STORAGE_KEY as APPLE_MUSIC_USER_TOKEN_STORAGE_KEY,
  DEV_TOKEN_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_STORAGE_KEY,
  DEV_TOKEN_EXPIRY_STORAGE_KEY as APPLE_MUSIC_DEV_TOKEN_EXPIRY_STORAGE_KEY,
} from "../../store/oauth-configs/appleMusic";
import { appleMusicInstalled, authorise } from "../../utils/appleMusic";

const AppleMusicSettingsPage = () => {
  const theme = useTheme();
  const { t } = useLingui();

  const [hasSetUp, setSetupState] = useState(
    !!getItem(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY),
  );
  const [loading, setLoading] = useState(false);

  const onPressConnect = async () => {
    const isInstalled = await appleMusicInstalled();

    if (!isInstalled) {
      // we can assume here it's Android because iOS always
      // has Apple Music
      ToastAndroid.show(
        t`Please install Apple Music to continue.`,
        ToastAndroid.SHORT,
      );
      await Linking.openURL(
        "https://play.google.com/store/apps/details?id=com.apple.android.music",
      );
      return;
    }

    setLoading(true);
    ToastAndroid.show(t`Log in with Apple to continue.`, ToastAndroid.SHORT);
    try {
      await authorise();
    } catch (error) {
      console.error(t`Authorisation failed:`, error);
    } finally {
      setLoading(false);
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
      t`Successfully disconnected from Apple Music.`,
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
          {hasSetUp ? (
            <Trans>
              You've connected your Apple Music account. Now you can press the
              share button on any setlist to get your playlist!
            </Trans>
          ) : (
            <Trans>
              Connect your Apple Music account to save setlists as playlists.
            </Trans>
          )}
        </Text>
        {hasSetUp ? (
          <Button
            {...buttonProps}
            buttonColor={theme.colors.error}
            onPress={onPressDisconnect}
          >
            <Trans>Disconnect Apple Music</Trans>
          </Button>
        ) : (
          <Button
            {...buttonProps}
            loading={loading}
            disabled={loading}
            onPress={onPressConnect}
          >
            <Trans>Connect with Apple Music</Trans>
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
    marginHorizontal: 12,
    marginBottom: 12,
    textAlign: "center",
  },
});

export default AppleMusicSettingsPage;
