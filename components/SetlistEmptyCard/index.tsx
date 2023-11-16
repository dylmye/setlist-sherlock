import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Card, Icon, Layout, Text } from "@ui-kitten/components";

interface SetlistEmptyCardProps {
  style?: StyleProp<ViewStyle>;
}

const Header = () => (
  <Layout style={styles.header}>
    <Icon name="info-outline" />
  </Layout>
);

/** Message to display when no setlist data has been detected */
const SetlistEmptyCard = ({ style }: SetlistEmptyCardProps) => (
  <Card status="info" style={style} header={Header}>
    <Layout>
      <Text category="s1" style={styles.bodyText}>
        Nobody's added a setlist for this concert yet.{"\n\n"}Check back later or add it yourself by clicking the pencil below.
      </Text>
    </Layout>
  </Card>
);

const styles = StyleSheet.create({
  header: {
    maxHeight: 24,
    display: "flex",
    justifyContent: "center",
    marginVertical: 10,
  },
  bodyText: {
    textAlign: "center",
    fontWeight: "bold"
  },
});

export default SetlistEmptyCard;
