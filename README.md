<div align="center">
  <img src="https://raw.githubusercontent.com/dylmye/setlist-sherlock/main/assets/icon-marketing-512.png" style="width: 4rem; height: auto; border-radius: 1000px">
  <h1>Setlist Sherlock</h1>
  <a href='https://play.google.com/store/apps/details?id=com.dylmye.setlists&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' style="width: 10rem" /></a>
</div>

Find and read concert setlists with ease. Powered by Setlists.fm.

F-Droid, iOS coming soon.

## Develop

This app is built on the [Expo](https://expo.dev) framework.

### Environment Variables

The following environment variables are required in a `.env` file in the root directory:

| Name                                       | Value                                                                              |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| EXPO_PUBLIC_SETLISTFM_API_KEY              | Setlist.fm API key from [here](https://api.setlist.fm/docs/)                       |
| EXPO_PUBLIC_SPOTIFY_API_KEY                | Spotify client ID from [here](https://developer.spotify.com/documentation/web-api) |
| EXPO_PUBLIC_APPLE_MUSIC_DEV_TOKEN_ENDPOINT | The URL (Lambda invocation endpoint etc) to grab a developer token from.           |

### Install

Requirements:

- node v18+
- yarn

```bash
$ yarn install
```

### Create Development Build

```bash
$ yarn start
```

Add a `--go` flag if you want to use the Expo Go app.

### Updating Setlist.fm API config

Fortunately Setlist.fm actually maintain their OpenAPI reference properly, so we can directly request their config.

To update our Setlist.fm RTK Query config:

0. Make sure you have `ts-node` installed globally - `yarn global add ts-node`
1. Run `yarn generate:api:setlistfm`
2. Overwrite with any patches as needed: check what's currently marked with "manually edited to match actual schema"

### Updating Spotify API config

[sonallux](https://github.com/sonallux/spotify-web-api)'s fixed Spotify API is used to generate the Spotify RTK query. It's released under MIT licence. Thanks sonallux :)

To update the Spotify API:

0. Grab the latest `fixed-spotify-open-api.yml` from [here](https://github.com/sonallux/spotify-web-api/releases)
1. Replace the file in `store/open-api-configs` named `spotify.yml`
2. Make sure you have `ts-node` installed globally - `yarn global add ts-node`
3. Run `yarn generate:api:spotify`

## Build

Use the GitHub workflow in this repo to create builds. Builds are created via [EAS](https://expo.dev/eas) on the cloud.

Instructions for creating a production build locally [are available here](https://docs.expo.dev/build-reference/local-builds/).

## Disclaimer

App icon by Olga from Noun Project (CC BY 3.0.)

Thanks to [Lomray Software](https://lomray.com/) for their [Apple Music package](https://github.com/Lomray-Software/react-native-apple-music)!

**Setlist Sherlock is not connected to or affiliated with Setlist.fm, Live Nation, Spotify, Apple or any of the artists' whose setlists are available or featured in the app.**

See attached software licence for important warranty information.
