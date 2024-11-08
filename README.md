<div align="center">
  <img src="https://raw.githubusercontent.com/dylmye/setlist-sherlock/main/assets/icon-marketing-512.png" style="width: 4rem; height: auto; border-radius: 1000px">
  <h1>Setlist Sherlock</h1>
</div>
<div align="center">
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fdylmye%2Fsetlist-sherlock?ref=badge_shield&issueType=license"><img alt="FOSSA License Scan Result" src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdylmye%2Fsetlist-sherlock.svg?type=shield&issueType=license" /></a>
  <a href="https://apps.apple.com/gb/app/setlist-sherlock/id6477339282?itscg=30200&itsct=apps_box_badge&mttnsubad=6477339282"><img alt="App Store" src="https://img.shields.io/itunes/v/6477339282?style=flat&logo=apple&logoColor=%23000000&label=App%20Store&labelColor=%23f9f9f9&color=%23ffffff"></a>
  <a href="https://play.google.com/store/apps/details?id=com.dylmye.setlists&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img src="https://img.shields.io/badge/Google_Play-0F9D58?style=flat&logo=google-play&logoColor=white"></a>
</div>

<br />

Find and read concert setlists with ease. Powered by Setlists.fm.

F-Droid coming soon.

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
- bun

```bash
$ bun install
```

### Create Development Build

```bash
$ bun run start
```

Add a `--go` flag if you want to use the Expo Go app.

### Updating Setlist.fm API config

Fortunately Setlist.fm actually maintain their OpenAPI reference properly, so we can directly request their config.

To update our Setlist.fm RTK Query config:

0. Make sure you have `ts-node` installed globally - `bun install -g ts-node`
1. Run `bun run generate:api:setlistfm`
2. Overwrite with any patches as needed: check what's currently marked with "manually edited to match actual schema"

### Updating Spotify API config

[sonallux](https://github.com/sonallux/spotify-web-api)'s fixed Spotify API is used to generate the Spotify RTK query. It's released under MIT licence. Thanks sonallux :)

To update the Spotify API:

0. Grab the latest `fixed-spotify-open-api.yml` from [here](https://github.com/sonallux/spotify-web-api/releases)
1. Replace the file in `store/open-api-configs` named `spotify.yml`
2. Make sure you have `ts-node` installed globally - `bun install -g ts-node`
3. Run `bun run generate:api:spotify`

## Build

Use the GitHub workflow in this repo to create builds. Builds are created via [EAS](https://expo.dev/eas) on the cloud.

Instructions for creating a production build locally [are available here](https://docs.expo.dev/build-reference/local-builds/).

## Support

This app wouldn't be possible without:

<div style="width: 15rem">

| <!-- -->                                        | 
| ----------------------------------------------- |
| <strong>![](readme_assets/lokalise.png) <br /> [Lokalise](https://lokalise.com/)</strong> |

</div>

## Disclaimer

App icon by Olga from Noun Project (CC BY 3.0.)

Thanks to [Lomray Software](https://lomray.com/) for their [Apple Music package](https://github.com/Lomray-Software/react-native-apple-music)!

**Setlist Sherlock is not connected to or affiliated with Setlist.fm, Live Nation, Spotify, Apple or any of the artists' whose setlists are available or featured in the app.**

See attached software licence for important warranty information.
