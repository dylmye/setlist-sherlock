import { I18nProvider } from "@lingui/react";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
  ThemeProvider,
  DarkTheme as DarkNavTheme,
  DefaultTheme as LightNavTheme,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
  PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme as DarkPaperTheme,
  MD3LightTheme as LightPaperTheme,
  ActivityIndicator,
} from "react-native-paper";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import PaperNavigationBar from "../components/PaperNavigationBar";
import { store } from "../store";
import { useSetLanguages } from "../utils/i18n";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: LightNavTheme,
  reactNavigationDark: DarkNavTheme,
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

  const persistor = persistStore(store);

  return (
    <I18nProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <ThemeProvider
            value={
              systemTheme === "dark"
                ? // @TODO: when react-native-paper adds font to NavigationTheme, revert back to returning just the object
                  { ...DarkTheme, fonts: DarkNavTheme.fonts }
                : { ...LightTheme, fonts: LightNavTheme.fonts }
            }
          >
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
