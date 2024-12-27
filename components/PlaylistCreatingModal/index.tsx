import { Trans } from "@lingui/react/macro";
import { Modal, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  MD2Colors,
  Surface,
  Text,
} from "react-native-paper";

interface PlaylistCreatingModalProps {
  /** eg. spotify, apple-music */
  provider: string;
  visible: boolean;
}

/** Loading state dialog for playlist creation */
const PlaylistCreatingModal = ({
  provider,
  visible,
}: PlaylistCreatingModalProps) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      statusBarTranslucent
      transparent
      hardwareAccelerated
    >
      <View style={styles.parentContainer}>
        <Surface elevation={3} style={styles.dialog}>
          <ActivityIndicator
            animating
            size="small"
            style={styles.spinner}
            color={provider === "spotify" ? MD2Colors.green300 : undefined}
          />
          <Text variant="bodyMedium" style={styles.text}>
            <Trans>Adding to {provider}...</Trans>
          </Text>
          <Text variant="bodySmall" style={styles.text}>
            <Trans>This will take up to a minute, please be patient</Trans>
          </Text>
        </Surface>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    padding: 24,
    borderRadius: 12,
  },
  spinner: {
    marginBottom: 6,
  },
  text: {
    textAlign: "center",
    paddingBottom: 6,
  },
});

export default PlaylistCreatingModal;
