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
      titleNumberOfLines={0}
    />
    <Card.Content>
      <Text variant="bodyMedium">
        Check back later or add it yourself by clicking the pencil button
        (Setlist.fm account required.)
      </Text>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    paddingTop: 8,
  },
});

export default SetlistEmptyCard;
