import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

interface SetlistSectionHeaderProps {
  title: string;
}

/** Display setlist section name (e.g. Encore) */
const SetlistSectionHeader = ({ title }: SetlistSectionHeaderProps) => (
  <Surface style={styles.sectionHeader} elevation={3}>
    <Text variant="titleLarge" style={styles.sectionHeaderText}>
      {title}
    </Text>
  </Surface>
);

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 16,
  },
  sectionHeaderText: {
    fontWeight: "bold",
  },
});

export default SetlistSectionHeader;
