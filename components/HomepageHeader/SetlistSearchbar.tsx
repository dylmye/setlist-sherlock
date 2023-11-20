import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Searchbar } from "react-native-paper";

interface SetlistSearchbarProps {
  style?: StyleProp<ViewStyle>;
}

/** Homepage search bar for setlists */
const SetlistSearchbar = ({ style }: SetlistSearchbarProps) => {
  const [query, setQuery] = useState("");
  return (
    <Searchbar
      placeholder="Search for a setlist"
      style={style}
      value={query}
      onChangeText={setQuery}
    />
  );
};

export default SetlistSearchbar;
