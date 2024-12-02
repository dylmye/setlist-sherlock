import { t } from "@lingui/macro";
import { router } from "expo-router";
import React, { useState } from "react";
import { Searchbar, SearchbarProps } from "react-native-paper";

interface SetlistSearchbarProps {
  style?: SearchbarProps["style"];
  redirectToSearchPage?: boolean;
  onSearch?: (search: string) => void;
  initialQuery?: string;
  searchbarProps?: Partial<
    Exclude<
      SearchbarProps,
      "style" | "value" | "onChangeText" | "onSubmitEditing"
    >
  >;
  loading?: boolean;
}

/** Homepage search bar for setlists */
const SetlistSearchbar = ({
  style,
  redirectToSearchPage,
  onSearch,
  initialQuery = "",
  searchbarProps = {},
  loading = false,
}: SetlistSearchbarProps) => {
  const [query, setQuery] = useState(initialQuery);

  const onSubmit = () => {
    if (redirectToSearchPage) {
      router.navigate(`/search?query=${query}`);
      return;
    }
    onSearch?.(query);
  };

  return (
    <Searchbar
      placeholder={t`Search artists`}
      style={style}
      value={query}
      onChangeText={setQuery}
      onSubmitEditing={onSubmit}
      loading={loading}
      {...searchbarProps}
    />
  );
};

export default SetlistSearchbar;
