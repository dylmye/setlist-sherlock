import { AndroidConfig, ConfigPlugin, withAndroidManifest } from 'expo/config-plugins';
import path from "node:path";
import fs from "node:fs/promises";

const FILE_PATH: string = "app/src/main/res/xml/shortcuts.xml";
const FILE_CONTENTS: string =
  `<?xml version="1.0" encoding="utf-8"?>
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">
  <capability android:name="actions.intent.GET_THING">
    <intent>
      <url-template android:value="setlist-sherlock://search{?query}" />
      <parameter android:name="thing.name" android:key="query" />
    </intent>
  </capability>
</shortcuts>
`;

/**
 * Writes the shortcut file to the path
 */
const withShortcutXmlFile: ConfigPlugin = (config) => {
  config = withAndroidManifest(config, async (cfg) => {
    const xmlsPath = path.join(
      cfg.modRequest.platformProjectRoot,
      FILE_PATH,
    );

    await fs.mkdir(path.dirname(xmlsPath), { recursive: true });

    await fs.writeFile(FILE_PATH, FILE_CONTENTS);

    return cfg;
  });
  return config;
}

/**
 * Adds reference to shortcuts xml in manifest
 */
const withManifest: ConfigPlugin = (config) => {
  config = withAndroidManifest(config, async (cfg) => {
    const mainActivity = AndroidConfig.Manifest.getMainActivityOrThrow(cfg.modResults)

    // @ts-expect-error no support for metadata within activities yet
    mainActivity['meta-data'] = [
      {
        $: {
          "android:name": "android.app.shortcuts",
          "android:resource": "@xml/shortcuts"
        }
      }
    ]

    return cfg;
  });

  return config;
}

const withMods: ConfigPlugin = (config) => {
  config = withShortcutXmlFile(config);
  config = withManifest(config);
  return config;
}

export default withMods;
