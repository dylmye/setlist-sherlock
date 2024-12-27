import { useLingui } from "@lingui/react/macro";
import { getItem } from "expo-secure-store";
import { useEffect, useMemo, useState } from "react";
import { ToastAndroid } from "react-native";
import { Appbar } from "react-native-paper";
import React from 'react';

import { USER_TOKEN_STORAGE_KEY as APPLE_MUSIC_USER_TOKEN_STORAGE_KEY } from "../../store/oauth-configs/appleMusic";
import { BEARER_TOKEN_STORAGE_KEY as SPOTIFY_BEARER_TOKEN_STORAGE_KEY } from "../../store/oauth-configs/spotify";
import { Setlist } from "../../store/services/setlistFm";
import {
  useGenerateAppleMusicPlaylistFromSongs,
  useGenerateSpotifyPlaylistFromSongs,
} from "../../utils/playlists";
import PlaylistCreatingModal from "../PlaylistCreatingModal";

interface AddToPlaylistAppbarActionProps {
  setlist: Setlist;
  show?: boolean;
}

/** An Appbar action with all handling for playlist export */
const AddToPlaylistAppbarAction = ({
  setlist,
  show = true,
}: AddToPlaylistAppbarActionProps) => {
  const { t } = useLingui();
  const [loading, setLoading] = useState(false);
  const hasSpotifySetup = !!getItem(SPOTIFY_BEARER_TOKEN_STORAGE_KEY);
  const hasAppleMusicSetup = !!getItem(APPLE_MUSIC_USER_TOKEN_STORAGE_KEY);
  const [provider, setProvider] = useState<string | null>(null);

  const createSpotifyPlaylist = useGenerateSpotifyPlaylistFromSongs(setlist);
  const createAppleMusicPlaylist =
    useGenerateAppleMusicPlaylistFromSongs(setlist);

  const showButton = useMemo(
    () => show && (hasSpotifySetup || hasAppleMusicSetup),
    [show, hasSpotifySetup, hasAppleMusicSetup],
  );

  const onPressExport = async () => {
    setLoading(true);
    const action: () => Promise<boolean> =
      provider === "spotify" ? createSpotifyPlaylist : createAppleMusicPlaylist;
    const success = await action();
    ToastAndroid.show(
      success
        ? t`Your playlist has been created!`
        : t`Unable to create ${provider} playlist. Please try again.`,
      ToastAndroid.SHORT,
    );
    setLoading(false);
  };

  // @TODO: dialog for selecting service, loading dialog

  // @TODO: this works for now, should type the provider properly with an enum
  useEffect(() => {
    if (hasSpotifySetup) {
      setProvider("spotify");
      return;
    }
    if (hasAppleMusicSetup) {
      setProvider("apple-music");
    }
  }, []);

  if (!showButton) {
    return <></>;
  }

  return (
    <>
      <Appbar.Action
        icon="playlist-plus"
        onPress={onPressExport}
        accessibilityLabel={t`Add this setlist to your Spotify`}
      />
      <PlaylistCreatingModal
        provider={provider ?? "apple-music"}
        visible={loading}
      />
    </>
  );
};

export default AddToPlaylistAppbarAction;
