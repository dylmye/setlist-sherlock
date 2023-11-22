import { router } from "expo-router";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Searchbar, SearchbarProps } from "react-native-paper";

interface SetlistSearchbarProps {
  style?: StyleProp<ViewStyle>;
  redirectToSearchPage?: boolean;
  onSearch?: (search: string) => void;
  initialQuery?: string;
  searchbarProps?: Partial<Exclude<SearchbarProps, 'style' | 'value' | 'onChangeText' | 'onSubmitEditing'>>;
}

/** Homepage search bar for setlists */
const SetlistSearchbar = ({
  style,
  redirectToSearchPage,
  onSearch,
  initialQuery = "",
  searchbarProps = {},
}: SetlistSearchbarProps) => {
  const [query, setQuery] = useState(initialQuery);

  const onSubmit = () => {
    if (redirectToSearchPage) {
      router.push(`/search?query=${query}`);
      return;
    }
    onSearch?.(query);
  };

  return (
    <Searchbar
      placeholder="Search artists"
      style={style}
      value={query}
      onChangeText={setQuery}
      onSubmitEditing={onSubmit}
      {...searchbarProps}
    />
  );
};

export default SetlistSearchbar;
