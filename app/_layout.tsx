import { I18nProvider } from "@lingui/react";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
  Stack,
  ThemeProvider,
  DarkTheme as DarkNavTheme,
  DefaultTheme as LightNavTheme,
  type Theme,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
  PaperProvider,
  MD3DarkTheme as DarkPaperTheme,
  MD3LightTheme as LightPaperTheme,
  ActivityIndicator,
  type MD3Theme,
} from "react-native-paper";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import PaperNavigationBar from "../components/PaperNavigationBar";
import { store } from "../store";
import { useSetLanguages } from "../utils/i18n";

/**
 * Maps Paper's MD3 colors onto an Expo Router navigation theme.
 *
 * Replaces `adaptNavigationTheme` from react-native-paper, which is typed
 * against React Navigation's `string` colors rather than Expo Router's
 * `ColorValue` colors.
 */
const createNavigationTheme = (
  paperTheme: MD3Theme,
  navTheme: Theme,
): Theme => ({
  ...navTheme,
  colors: {
    ...navTheme.colors,
    primary: paperTheme.colors.primary,
    background: paperTheme.colors.background,
    card: paperTheme.colors.elevation.level2,
    text: paperTheme.colors.onSurface,
    border: paperTheme.colors.outline,
    notification: paperTheme.colors.error,
  },
});

const AppLayout = () => {
  const systemTheme = useColorScheme();
  const { theme: m3Theme } = useMaterial3Theme({
    fallbackSourceColor: "#C8E6C9",
  });
  const i18n = useSetLanguages();

  const paperTheme =
    systemTheme === "dark"
      ? { ...DarkPaperTheme, colors: m3Theme.dark }
      : { ...LightPaperTheme, colors: m3Theme.light };

  const navigationTheme = createNavigationTheme(
    systemTheme === "dark" ? DarkPaperTheme : LightPaperTheme,
    systemTheme === "dark" ? DarkNavTheme : LightNavTheme,
  );

  const persistor = persistStore(store);

  return (
    <I18nProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <ThemeProvider value={navigationTheme}>
            <PaperProvider theme={paperTheme}>
              <StatusBar style="auto" />
              <Stack
                screenOptions={{
                  header: (props) => <PaperNavigationBar {...props} />,
                }}
              />
            </PaperProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </I18nProvider>
  );
};

export default AppLayout;
