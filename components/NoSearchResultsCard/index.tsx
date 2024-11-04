import { t, Trans } from "@lingui/macro";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

/** Message to display when no setlist data has been detected */
const NoSearchResultsCard = () => (
  <Card style={styles.container} mode="contained">
    <Card.Title
      title={t`Couldn't find any setlists for your search.`}
      titleVariant="titleMedium"
      titleStyle={styles.title}
      titleNumberOfLines={0}
    />
    <Card.Content>
      <Text variant="bodyMedium">
        <Trans>
          There may be a spelling mistake in your search, or nobody has added
          the setlist you're looking for to Setlist.fm yet.
        </Trans>
      </Text>
      <Text variant="bodyMedium">
        <Trans>
          Remember to only enter the artist's name in the search box (and use
          the filters for location and date.)
        </Trans>
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

export default NoSearchResultsCard;
