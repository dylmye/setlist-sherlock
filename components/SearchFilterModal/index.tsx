import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  IconButton,
  Surface,
  Text,
  TextInputProps,
} from "react-native-paper";
import { useForm } from "react-hook-form";

import { Get10SearchSetlistsApiArg } from "../../store/services/setlistFm";
import ControlledTextInput from "../ControlledTextInput";

interface SearchFilterModalProps {
  visible: boolean;
  onDismiss: (newFilters: Get10SearchSetlistsApiArg) => void;
  initialFilters: Pick<
    Get10SearchSetlistsApiArg,
    "cityName" | "tourName" | "venueName" | "year"
  >;
}

/** Additional filters for setlists */
const SearchFilterModal = ({
  visible,
  onDismiss,
  initialFilters,
}: SearchFilterModalProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Partial<Get10SearchSetlistsApiArg>>({
    defaultValues: initialFilters,
  });

  const defaultTextInputProps: Partial<TextInputProps> = {
    mode: "outlined",
    style: styles.field,
  };

  return (
    <Modal
      animationType="slide"
      onDismiss={() => onDismiss(initialFilters)}
      onRequestClose={() => onDismiss(initialFilters)}
      visible={visible}
      // presentationStyle="pageSheet"
      statusBarTranslucent
      transparent
      hardwareAccelerated
    >
      <View style={styles.parentContainer}>
        <KeyboardAvoidingView
          style={styles.bottomModalParent}
          behavior="padding"
        >
          <Surface
            style={[
              { width: Dimensions.get("window").width - 12 },
              styles.bottomModalSurface,
            ]}
            elevation={5}
          >
            <View style={styles.titleBar}>
              <Text variant="titleMedium">More Filters</Text>
              <IconButton
                icon="close"
                size={18}
                onPress={() => onDismiss(initialFilters)}
              />
            </View>
            <ControlledTextInput
              control={control}
              fieldName="cityName"
              label="City"
              errors={errors}
              textInputProps={defaultTextInputProps}
            />
            <ControlledTextInput
              control={control}
              fieldName="tourName"
              label="Tour Name"
              errors={errors}
              textInputProps={defaultTextInputProps}
            />
            <ControlledTextInput
              control={control}
              fieldName="venueName"
              label="Venue"
              errors={errors}
              textInputProps={defaultTextInputProps}
            />
            <ControlledTextInput
              control={control}
              fieldName="year"
              label="Year"
              errors={errors}
              textInputProps={{
                ...defaultTextInputProps,
                keyboardType: "decimal-pad",
              }}
              controllerProps={{
                rules: {
                  // regex: any number between 1000-2999 (TODO: add 3 before the year 3000)
                  pattern: {
                    value: /^(1|2)\d{3}/,
                    message: "Please specify a valid year."
                  }
                },
              }}
            />
            <View style={styles.actions}>
              {/* TODO: fix button not working */}
              {/* <Button mode="contained-tonal" onPress={() => reset({})}>
                Clear Filters
              </Button> */}
              <View />
              <Button
                mode="contained"
                onPress={handleSubmit(onDismiss, console.error)}
              >
                Apply
              </Button>
            </View>
          </Surface>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomModalParent: {
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
  },
  bottomModalSurface: {
    marginTop: "auto",
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  field: {
    marginBottom: 12,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SearchFilterModal;
