import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./spotify.yml",
  apiFile: "../services/spotify/base.ts",
  apiImport: "spotifyApi",
  outputFile: "../services/spotify/index.ts",
  filterEndpoints: [
    "postUsersByUserIdPlaylists", // create-playlist
    "postPlaylistsByPlaylistIdTracks", // add-tracks-to-playlist
    "search", // search
  ],
  exportName: "spotifyApi",
  hooks: true,
};

export default config;
