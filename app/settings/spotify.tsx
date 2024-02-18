import { StyleSheet, ToastAndroid, View } from "react-native";
import {
  AccessTokenRequestConfig,
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import {
  deleteItemAsync,
  getItem,
  getItemAsync,
  setItemAsync,
} from "expo-secure-store";
import { Stack } from "expo-router";

import {
  discovery as spotifyDiscovery,
  clientId as spotifyClientId,
  BEARER_TOKEN_STORAGE_KEY as SPOTIFY_BEARER_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY as SPOTIFY_REFRESH_TOKEN_STORAGE_KEY,
  SPOTIFY_USERNAME_STORAGE_KEY,
} from "../../store/oauth-configs/spotify";
import { Button, ButtonProps, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { coolDownAsync, warmUpAsync } from "expo-web-browser";

const SpotifySettingsPage = () => {
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
      scopes: ["user-read-email", "playlist-modify-public"],
      redirectUri,
    },
    spotifyDiscovery,
  );

  const onPressConnect = () => {
    setLoading(true);
    ToastAndroid.show("Log in with Spotify to continue.", ToastAndroid.SHORT);
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
      "Successfully disconnected from Spotify.",
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
            "Successfully connected Spotify.",
            ToastAndroid.SHORT,
          );
        },
      );
    }

    if (response?.type === "cancel" || response?.type === "dismiss") {
      ToastAndroid.show(
        "Spotify log in cancelled, please try again.",
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
          {hasSetUp
            ? "You've connected your Spotify. Now you can press the share button on any setlist to get your playlist!"
            : "Connect your Spotify account to save setlists as playlists."}
        </Text>
        {hasSetUp ? (
          <Button {...buttonProps} onPress={onPressDisconnect}>
            Disconnect Spotify
          </Button>
        ) : (
          <Button
            {...buttonProps}
            loading={loading}
            disabled={loading}
            onPress={onPressConnect}
          >
            {loading ? "Connecting..." : "Connect Spotify"}
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
