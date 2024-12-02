/* eslint-env node */

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

/** Lingui: see https://lingui.dev/ref/metro-transformer */
config.transformer.babelTransformerPath = require.resolve(
  "@lingui/metro-transformer/expo",
);
config.resolver.sourceExts.push("po", "pot");

module.exports = config;
