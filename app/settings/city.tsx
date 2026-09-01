import { Trans, useLingui } from "@lingui/react/macro";
import { Stack } from "expo-router";
import { getItem } from "expo-secure-store";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const CitySettingsPage = () => {
  const { t } = useLingui();

  const [userCity, setCityState] = useState(
    getItem("userCityIdAndName"),
  );

  return (
    <View style={styles.container}>
      {/* <Stack.SearchBar placeholder={t`Search your city...`} /> */}
      <View style={[styles.container, styles.centredContainer]}>
        <Text style={styles.copy} variant="bodyMedium">
          {userCity ?
            <Trans>
              Your city is currently set to {userCity}.
            </Trans> : <Trans>
              Select your city to see gigs in your area on the homepage.
            </Trans>}
        </Text>
      </View>
    </View>
  )
}

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

export default CitySettingsPage;