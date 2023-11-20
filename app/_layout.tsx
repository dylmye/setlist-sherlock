import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ThemeProvider,
  DarkTheme as DarkNavTheme,
  DefaultTheme as LightNavTheme,
} from "@react-navigation/native";
import {
  PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme as DarkPaperTheme,
  MD3LightTheme as LightPaperTheme,
} from "react-native-paper";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";

import { store } from "../store";
import PaperNavigationBar from "../components/PaperNavigationBar";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: LightNavTheme,
  reactNavigationDark: DarkNavTheme,
});

const AppLayout = () => {
  const systemTheme = useColorScheme();
  const { theme: m3Theme } = useMaterial3Theme();

  const paperTheme =
    systemTheme === "dark"
      ? { ...DarkPaperTheme, colors: m3Theme.dark }
      : { ...LightPaperTheme, colors: m3Theme.light };

  return (
    <Provider store={store}>
      <ThemeProvider value={systemTheme === "dark" ? DarkTheme : LightTheme}>
        <PaperProvider theme={paperTheme}>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              header: (props) => <PaperNavigationBar {...props} />,
            }}
          />
        </PaperProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppLayout;
