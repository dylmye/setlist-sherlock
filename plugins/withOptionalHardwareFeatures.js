const { withAndroidManifest } = require("expo/config-plugins");

/**
 * Features that Play infers as required from the manifest:
 * - `android.hardware.screen.portrait` from the portrait-locked MainActivity
 * - `android.hardware.wifi` from expo-network's ACCESS_WIFI_STATE permission
 *
 * Neither is essential to installing/running the app, so mark them optional to
 * stop Play from restricting availability.
 */
const OPTIONAL_FEATURES = [
  "android.hardware.screen.portrait",
  "android.hardware.wifi",
];

/** @type {import('expo/config-plugins').ConfigPlugin} */
const withOptionalHardwareFeatures = (config) =>
  withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    manifest["uses-feature"] = manifest["uses-feature"] ?? [];

    for (const name of OPTIONAL_FEATURES) {
      const existing = manifest["uses-feature"].find(
        (feature) => feature.$?.["android:name"] === name,
      );

      if (existing) {
        existing.$["android:required"] = "false";
      } else {
        manifest["uses-feature"].push({
          $: {
            "android:name": name,
            "android:required": "false",
          },
        });
      }
    }

    return config;
  });

module.exports = withOptionalHardwareFeatures;
