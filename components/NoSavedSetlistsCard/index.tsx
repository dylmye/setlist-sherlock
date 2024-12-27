import { useLingui, Trans } from "@lingui/react/macro";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

/** Message to display when no setlist data has been detected */
const NoSavedSetlistsCard = () => {
  const { t } = useLingui();
  return (
    <Card style={styles.container} mode="contained">
      <Card.Title
        title={t`You haven't saved any setlists yet.`}
        titleVariant="titleMedium"
        titleStyle={styles.title}
        titleNumberOfLines={0}
      />
      <Card.Content>
        <Text variant="bodyMedium">
          <Trans>
            Search for your favourite setlists, then add them by clicking on the{" "}
            {`\u2b50`} button.
          </Trans>
        </Text>
      </Card.Content>
    </Card>
  )
};

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
