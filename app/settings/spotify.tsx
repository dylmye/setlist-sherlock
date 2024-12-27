import { useLingui, Trans } from "@lingui/react/macro";
import {
  AccessTokenRequestConfig,
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { Stack } from "expo-router";
import {
  deleteItemAsync,
  getItem,
  getItemAsync,
  setItemAsync,
} from "expo-secure-store";
import { coolDownAsync, warmUpAsync } from "expo-web-browser";
import { useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { Button, ButtonProps, Text, useTheme } from "react-native-paper";

import {
  discovery as spotifyDiscovery,
  clientId as spotifyClientId,
  BEARER_TOKEN_STORAGE_KEY as SPOTIFY_BEARER_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY as SPOTIFY_REFRESH_TOKEN_STORAGE_KEY,
  SPOTIFY_USERNAME_STORAGE_KEY,
} from "../../store/oauth-configs/spotify";

const SpotifySettingsPage = () => {
  const { t } = useLingui();
  const theme = useTheme();

  const [hasSetUp, setSetupState] = useState(
    !!getItem(SPOTIFY_BEARER_TOKEN_STORAGE_KEY),
  );
  const [loading, setLoading] = useState(false);

  const redirectUri = makeRedirectUri({
    // scheme: "setlist-sherlock",
    scheme: "com.dylmye.setlists",
    path: "settings/spotify",
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: spotifyClientId ?? "NO_SPOTIFY_CLIENT_ID",
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "user-library-modify",
        "user-library-read",
      ],
      redirectUri,
    },
    spotifyDiscovery,
  );

  const onPressConnect = () => {
    setLoading(true);
    ToastAndroid.show(t`Log in with Spotify to continue.`, ToastAndroid.SHORT);
    promptAsync();
  };

  const onPressDisconnect = () => {
    setLoading(true);
    const onDelete = async () => {
      await deleteItemAsync(SPOTIFY_BEARER_TOKEN_STORAGE_KEY);
      await deleteItemAsync(SPOTIFY_REFRESH_TOKEN_STORAGE_KEY);
      await deleteItemAsync(SPOTIFY_USERNAME_STORAGE_KEY);
    };
    onDelete();
    setLoading(false);
    setSetupState(false);
    ToastAndroid.show(
      t`Successfully disconnected from Spotify.`,
      ToastAndroid.SHORT,
    );
  };

  const buttonProps: Partial<ButtonProps> = {
    mode: "contained",
    icon: "spotify",
  };

  useEffect(() => {
    warmUpAsync();

    // source: https://docs.expo.dev/guides/authentication/#cognito
    const exchangeCodeForTokens = async (
      exchangeConfig: AccessTokenRequestConfig,
      callback: () => void,
    ) => {
      try {
        const exchangeRes = await exchangeCodeAsync(
          exchangeConfig,
          spotifyDiscovery,
        );
        await setItemAsync(
          SPOTIFY_BEARER_TOKEN_STORAGE_KEY,
          exchangeRes.accessToken,
        );
        await setItemAsync(
          SPOTIFY_REFRESH_TOKEN_STORAGE_KEY,
          exchangeRes.refreshToken!,
        );
        setSetupState(true);
        callback();
      } catch (e) {
        console.error(e);
      }

      await getItemAsync(SPOTIFY_BEARER_TOKEN_STORAGE_KEY);
    };

    if (response?.type === "success") {
      exchangeCodeForTokens(
        {
          clientId: spotifyClientId ?? "NO_SPOTIFY_CLIENT_ID",
          code: response?.params?.code,
          redirectUri,
          extraParams: {
            code_verifier: request!.codeVerifier!,
          },
        },
        () => {
          setLoading(false);
          ToastAndroid.show(
            t`Successfully connected to Spotify.`,
            ToastAndroid.SHORT,
          );
        },
      );
    }

    if (response?.type === "cancel" || response?.type === "dismiss") {
      ToastAndroid.show(
        t`Spotify log in cancelled, please try again.`,
        ToastAndroid.SHORT,
      );
      setLoading(false);
    }

    return () => {
      coolDownAsync();
    };
  }, [response]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Spotify" }} />
      <View style={[styles.container, styles.centredContainer]}>
        <Text style={styles.copy} variant="bodyMedium">
          {hasSetUp ? (
            <Trans>
              You've connected your Spotify. Now you can press the share button
              on any setlist to get your playlist!
            </Trans>
          ) : (
            <Trans>
              Connect your Spotify account to save setlists as playlists.
            </Trans>
          )}
        </Text>
        {hasSetUp ? (
          <Button
            {...buttonProps}
            buttonColor={theme.colors.error}
            onPress={onPressDisconnect}
          >
            <Trans>Disconnect Spotify</Trans>
          </Button>
        ) : (
          <Button
            {...buttonProps}
            loading={loading}
            disabled={loading}
            onPress={onPressConnect}
          >
            {loading ? t`Connecting...` : t`Connect with Spotify`}
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

export default SpotifySettingsPage;
