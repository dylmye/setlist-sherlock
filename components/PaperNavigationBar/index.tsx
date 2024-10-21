import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";

/** Replacement RNav-compatible topbar */
const PaperNavigationBar = ({
  route,
  options,
  navigation,
  back,
}: NativeStackHeaderProps) => {
  const title = getHeaderTitle(options, route.name);
  const RightAction = options?.headerRight!;

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {options?.headerRight ? <RightAction canGoBack={false} /> : null}
    </Appbar.Header>
  );
};

export default PaperNavigationBar;
