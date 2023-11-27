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

| Name                          | Value                         |
| ----------------------------- | ----------------------------- |
| EXPO_PUBLIC_SETLISTFM_API_KEY | Setlist.fm API key from [here](https://api.setlist.fm/docs/) |

### Install

Requirements:
* node v18+
* yarn

```bash
$ yarn install
```

### Create Development Build

```bash
$ yarn start
```

Add a `--go` flag if you want to use the Expo Go app.


## Build

Use the GitHub workflow in this repo to create builds. Builds are created via [EAS](https://expo.dev/eas) on the cloud.

Instructions for creating a production build locally [are available here](https://docs.expo.dev/build-reference/local-builds/).

## Disclaimer

App icon by Olga from Noun Project (CC BY 3.0.)

**Setlist Sherlock is not connected to or affiliated with Setlist.fm, Live Nation or any of the artists' whose setlists are available or featured in the app.**

See attached software licence for important warranty information.
