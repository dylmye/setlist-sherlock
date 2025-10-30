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
  discovery as tidalDiscovery,
  clientId as tidalClientId,
  BEARER_TOKEN_STORAGE_KEY as TIDAL_BEARER_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY as TIDAL_REFRESH_TOKEN_STORAGE_KEY,
} from "../../store/oauth-configs/tidal";

const TidalSettingsPage = () => {
  const { t } = useLingui();
  const theme = useTheme();

  const [hasSetUp, setSetupState] = useState(
    !!getItem(TIDAL_BEARER_TOKEN_STORAGE_KEY),
  );
  const [loading, setLoading] = useState(false);

  const redirectUri = makeRedirectUri({
    // scheme: "setlist-sherlock",
    scheme: "com.dylmye.setlists",
    path: "settings/tidal",
  });

  console.log({ redirectUri })

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: tidalClientId ?? "NO_TIDAL_CLIENT_ID",
      scopes: [
        "playlists.write", // to create the playlist
        "search.read", // to find track IDs
        "user.read", // to determine country code (so correct region tracks are added to playlist)
      ],
      redirectUri,
    },
    tidalDiscovery,
  );

  const onPressConnect = () => {
    setLoading(true);
    ToastAndroid.show(t`Log in with TIDAL to continue.`, ToastAndroid.SHORT);
    promptAsync();
  };

  const onPressDisconnect = () => {
    setLoading(true);
    const onDelete = async () => {
      await deleteItemAsync(TIDAL_BEARER_TOKEN_STORAGE_KEY);
      await deleteItemAsync(TIDAL_REFRESH_TOKEN_STORAGE_KEY);
    };
    onDelete();
    setLoading(false);
    setSetupState(false);
    ToastAndroid.show(
      t`Successfully disconnected from TIDAL.`,
      ToastAndroid.SHORT,
    );
  };

  const buttonProps: Partial<ButtonProps> = {
    mode: "contained",
    icon: "music",
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
          tidalDiscovery,
        );
        await setItemAsync(
          TIDAL_BEARER_TOKEN_STORAGE_KEY,
          exchangeRes.accessToken,
        );
        await setItemAsync(
          TIDAL_REFRESH_TOKEN_STORAGE_KEY,
          exchangeRes.refreshToken!,
        );
        setSetupState(true);
        callback();
      } catch (e) {
        console.error(e);
      }

      await getItemAsync(TIDAL_BEARER_TOKEN_STORAGE_KEY);
    };

    if (response?.type === "success") {
      exchangeCodeForTokens(
        {
          clientId: tidalClientId ?? "NO_TIDAL_CLIENT_ID",
          code: response?.params?.code,
          redirectUri,
          extraParams: {
            code_verifier: request!.codeVerifier!,
          },
        },
        () => {
          setLoading(false);
          ToastAndroid.show(
            t`Successfully connected to TIDAL.`,
            ToastAndroid.SHORT,
          );
        },
      );
    }

    if (response?.type === "cancel" || response?.type === "dismiss") {
      ToastAndroid.show(
        t`TIDAL log in cancelled, please try again.`,
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
      <Stack.Screen options={{ title: "TIDAL" }} />
      <View style={[styles.container, styles.centredContainer]}>
        <Text style={styles.copy} variant="bodyMedium">
          {hasSetUp ? (
            <Trans>
              You've connected your TIDAL. Now you can press the share button
              on any setlist to get your playlist!
            </Trans>
          ) : (
            <Trans>
              Connect your TIDAL account to save setlists as playlists.
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
            {loading ? t`Connecting...` : t`Connect with TIDAL`}
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

export default TidalSettingsPage;
