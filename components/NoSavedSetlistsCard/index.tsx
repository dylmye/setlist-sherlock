import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Card, Text } from "react-native-paper";

/** Message to display when no setlist data has been detected */
const NoSavedSetlistsCard = () => (
  <Card style={styles.container} mode="contained">
    <Card.Title
      title="You haven't saved any setlists yet."
      titleVariant="titleMedium"
      titleStyle={styles.title}
      titleNumberOfLines={0}
    />
    <Card.Content>
      <Text variant="bodyMedium">
        Search for your favourite setlists, then add them by clicking on the {`\u2b50`} button.
      </Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  title: {
    fontWeight: "bold",
    paddingTop: 8,
  },
});

export default NoSavedSetlistsCard;
