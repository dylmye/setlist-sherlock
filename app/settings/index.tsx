import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { discovery as spotifyDiscovery, clientId as spotifyClientId } from '../../store/oauth-configs/spotify';

const SettingsPage = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: spotifyClientId ?? 'NO_SPOTIFY_CLIENT_ID',
      scopes: ['user-read-email', 'playlist-modify-public'],
      redirectUri: makeRedirectUri({
        scheme: 'setlist-sherlock'
      }),
    },
    spotifyDiscovery
  );

  return <></>;
};

export default SettingsPage;
