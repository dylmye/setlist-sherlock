import { load, dump } from "js-yaml";
import { valid as isValidVersion } from "semver";

const updatePackageJson = async (version: string): Promise<void> => {
  console.log("Updating package.json...");
  const filename = "./package.json";
  const json = await Bun.file(filename).json();
  try {
    await Bun.write(
      filename,
      JSON.stringify(Object.assign(json, { version }), null, 2),
    );
  } catch {
    throw new Error("Unable to update package.json");
  }
  console.log("Updated package.json\n");
};

const updateExpo = async (version: string): Promise<void> => {
  console.log("Updating app.json...");
  const filename = "./app.json";
  let json = await Bun.file(filename).json();
  json.expo.version = version;
  try {
    await Bun.write(filename, JSON.stringify(json, null, 2));
  } catch {
    throw new Error("Unable to update app.json");
  }
  console.log("Updated app.json\n");
};

type FdroidMetadata = {
  Builds: {
    versionName: string;
    versionCode: number;
    commit: string;
    subdir: string;
    sudo: string[];
    init: string;
    gradle: string[];
    forcevercode: boolean;
    prebuild: string;
    scanignore: string[];
    ndk: string;
  }[];
  CurrentVersion: string;
  CurrentVersionCode: number;
};

const NDK_VERSION = "26.1.10909125";

const updateFdroid = async (version: string): Promise<void> => {
  console.log("Updating com.dylmye.setlists.yml...");
  const filename = "./metadata/com.dylmye.setlists.yml";
  const fdroidRaw = await Bun.file(filename).text();
  const fdroidYaml = load(fdroidRaw, { filename }) as FdroidMetadata;

  const yamlUpdates: Partial<FdroidMetadata> = {
    CurrentVersion: version,
    CurrentVersionCode: fdroidYaml.CurrentVersionCode + 1,
    Builds: [
      ...fdroidYaml.Builds,
      {
        versionName: version,
        versionCode: fdroidYaml.CurrentVersionCode + 1,
        commit: version,
        subdir: "android/app",
        sudo: [
          "curl -Lo node.tar.gz https://nodejs.org/dist/v20.18.1/node-v20.18.1-linux-x64.tar.gz",
          'echo "259e5a8bf2e15ecece65bd2a47153262eda71c0b2c9700d5e703ce4951572784 node.tar.gz" | sha256sum -c -',
          "tar xzf node.tar.gz --strip-components=1 -C /usr/local/",
          "sysctl fs.inotify.max_user_watches=524288 || true",
          "npm install -g bun",
        ],
        init: "bun install --frozen-lockfile",
        gradle: ["yes"],
        forcevercode: true,
        prebuild: "cd ../../ && bun x expo prebuild --platform android",
        scanignore: ["node_modules", "webhooks"],
        ndk: NDK_VERSION,
      },
    ],
  };

  // we have to use yes instead of true due to fdroid's formatter! fun!
  // they also require dumb spacing
  const dumpedYaml = dump(Object.assign(fdroidYaml, yamlUpdates), {
    lineWidth: -1,
  })
    .replaceAll("'yes'", "yes")
    .replace("AutoName:", `\nAutoName:`)
    .replace("RepoType:", `\nRepoType:`)
    .replace("Builds:", `\nBuilds:`)
    .replace("AllowedAPKSigningKeys", `\nAllowedAPKSigningKeys`)
    .replace("AutoUpdateMode", `\nAutoUpdateMode`);

  try {
    await Bun.write(filename, dumpedYaml);
  } catch {
    throw new Error("Unable to update package.json");
  }
  console.log("Updated com.dylmye.setlists.yml\n");
};

//////////////////////////////////////////////////
const main = async (): Promise<void> => {
  const versionNumber = Bun.argv[2];
  if (!isValidVersion(versionNumber)) {
    throw new Error(
      `Version number "${versionNumber}" is not a valid semver value.`,
    );
  }
  await updatePackageJson(versionNumber);
  await updateExpo(versionNumber);
  await updateFdroid(versionNumber);
  console.log("all done :)");
};
//////////////////////////////////////////////////
main();
