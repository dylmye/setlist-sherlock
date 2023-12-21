import {
  Control,
  Controller,
  ControllerProps,
  FieldErrors,
} from "react-hook-form";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

interface ControlledTextInputProps {
  control: Control;
  fieldName: string;
  label: TextInputProps['label'];
  clearable?: boolean;
  textInputProps?: Partial<TextInputProps>;
  controllerProps?: Partial<Exclude<ControllerProps, "control" | "render">>;
  errors?: FieldErrors;
}

/** TextInput that can be used in react-hook-form forms */
const ControlledTextInput = ({
  control,
  fieldName,
  label,
  clearable = true,
  textInputProps = {},
  controllerProps = {},
  errors = {},
}: ControlledTextInputProps) => (
  <Controller
    control={control}
    name={fieldName}
    defaultValue=""
    render={({ field: { onChange, onBlur, value } }) => (
      <>
        <TextInput
          label={label}
          value={value}
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          right={
            clearable &&
            !!value && (
              <TextInput.Icon icon="close" onPress={() => onChange("")} />
            )
          }
          {...textInputProps}
        />
        {errors?.[fieldName] && (
          <HelperText type="error">
            {errors?.[fieldName]?.message as string}
          </HelperText>
        )}
      </>
    )}
    {...controllerProps}
  />
);

export default ControlledTextInput;
