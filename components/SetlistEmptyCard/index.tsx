import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Card, Text } from "react-native-paper";

interface SetlistEmptyCardProps {
  style?: StyleProp<ViewStyle>;
}

/** Message to display when no setlist data has been detected */
const SetlistEmptyCard = ({ style }: SetlistEmptyCardProps) => (
  <Card style={style} mode="contained">
    <Card.Title
      title="Nobody's added a setlist for this concert yet."
      titleVariant="titleMedium"
      titleStyle={styles.title}
    />
    <Card.Content>
      <Text variant="bodyMedium">
        Check back later or add it yourself by clicking the pencil button.
      </Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
});

export default SetlistEmptyCard;
