import { StyleProp, ViewStyle, StyleSheet, ViewProps } from "react-native";
import { Card, Icon, Layout, Text, useTheme } from "@ui-kitten/components";

interface SetlistEmptyCardProps {
  style?: StyleProp<ViewStyle>;
}

const Header = ({ style }: ViewProps) => {
  const theme = useTheme();
  return (
    <Layout style={[styles.header]}>
      <Icon
        name="info-outline"
        style={[styles.headerIcon, { tintColor: theme["color-basic-600"] }]}
      />
    </Layout>
  );
};

/** Message to display when no setlist data has been detected */
const SetlistEmptyCard = ({ style }: SetlistEmptyCardProps) => (
  <Card status="info" style={style} header={(props) => <Header {...props} />}>
    <Layout>
      <Text category="s1" style={styles.bodyText}>
        Nobody's added a setlist for this concert yet.{"\n\n"}Check back later
        or add it yourself by clicking the pencil below.
      </Text>
    </Layout>
  </Card>
);

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  bodyText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default SetlistEmptyCard;
