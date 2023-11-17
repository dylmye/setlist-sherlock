import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import { store } from "../store";

const AppLayout = () => {
  const systemTheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={systemTheme === "dark" ? DarkTheme : DefaultTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={systemTheme === "dark" ? eva.dark : eva.light}
        >
          <StatusBar style="auto" />
          <Stack />
        </ApplicationProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppLayout;
