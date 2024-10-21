import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";

interface HeaderActionButtonsProps {
  visible: boolean;
}

const HeaderActionButtons = ({ visible }: HeaderActionButtonsProps) => {
  const config: WithTimingConfig = {
    duration: 250,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const width = useSharedValue(0);
  const derivedWidth = useDerivedValue(() =>
    withTiming(width.value * Number(visible), config),
  );

  const actionButtonsStyle = useAnimatedStyle(() => ({
    width: derivedWidth.value,
  }));

  return (
    <Animated.View style={[styles.container, actionButtonsStyle]}>
      <View
        style={styles.actions}
        onLayout={(e) => (width.value = e.nativeEvent.layout.width)}
      >
        <Appbar.Action
          icon="star"
          accessibilityLabel="View saved setlists"
          onPress={() => {
            router.navigate("/saved");
          }}
        />
        <Appbar.Action
          icon="cog"
          accessibilityLabel="Open Settings Menu"
          onPress={() => {
            router.navigate("/settings");
          }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  actions: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
});

export default HeaderActionButtons;
