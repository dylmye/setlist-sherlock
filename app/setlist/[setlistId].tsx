import { StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Layout, Text } from "@ui-kitten/components";
import { useGet10SetlistBySetlistIdQuery } from "../../store/services/setlistFm";

const SetlistDetails = () => {
    const { setlistId } = useLocalSearchParams<{ setlistId: string }>();
    const {
      data: setlist,
    } = useGet10SetlistBySetlistIdQuery({ setlistId: setlistId! });
  return (
    <Layout style={styles.container}>
      <Stack.Screen options={{ title: "Setlist Title" }} />
      <Text category="h4" style={styles.title}>
        Setlist Title
      </Text>
      <Text category="p1">{JSON.stringify(setlist, null, 2)}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 8,
  },
});

export default SetlistDetails;
