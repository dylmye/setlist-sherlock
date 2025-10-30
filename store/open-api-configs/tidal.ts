import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "https://tidal-music.github.io/tidal-api-reference/tidal-api-oas.json",
  apiFile: "../services/tidal/base.ts",
  apiImport: "tidalApi",
  outputFile: "../services/tidal/index.ts",
  filterEndpoints: [
    "postPlaylists", // create-playlist
  ],
  exportName: "tidalApi",
  hooks: true,
};

export default config;
