import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Get10SearchSetlistsApiArg } from "../../store/services/setlistFm";
import { Surface, Text, TextInput } from "react-native-paper";

interface SearchFilterModalProps {
  visible: boolean;
  onDismiss: (newFilters: Get10SearchSetlistsApiArg) => void;
  initialFilters?: Pick<
    Get10SearchSetlistsApiArg,
    "cityName" | "tourName" | "venueName" | "date"
  >;
}

/** Additional filters for setlists */
const SearchFilterModal = ({
  visible,
  onDismiss,
  initialFilters,
}: SearchFilterModalProps) => (
  <Modal
    animationType="slide"
    onDismiss={() => onDismiss({})}
    onRequestClose={() => onDismiss({})}
    visible={visible}
    // presentationStyle="pageSheet"
    statusBarTranslucent
    transparent
    hardwareAccelerated
  >
    <View style={styles.parentContainer}>
      <Pressable
        style={styles.backdrop}
        onPress={() => onDismiss({})}
      ></Pressable>

      <KeyboardAvoidingView style={styles.bottomModalParent} behavior="padding">
        <Surface
          style={[
            { width: Dimensions.get("window").width },
            styles.bottomModalSurface,
          ]}
          elevation={4}
        >
          <Text variant="titleMedium" style={styles.title}>
            More Filters
          </Text>
          <TextInput
            value=""
            label="City"
            mode="outlined"
            style={styles.field}
          />
          <TextInput
            value=""
            label="Tour Name"
            mode="outlined"
            style={styles.field}
          />
          <TextInput
            value=""
            label="Venue"
            mode="outlined"
            style={styles.field}
          />
          <TextInput
            value=""
            label="Date"
            mode="outlined"
            style={styles.field}
          />
        </Surface>
      </KeyboardAvoidingView>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomModalParent: {
    marginTop: "auto",
  },
  bottomModalSurface: {
    marginTop: "auto",
    padding: 20,
  },
  title: {
    marginBottom: 6,
  },
  field: {
    marginBottom: 12,
  },
});

export default SearchFilterModal;
