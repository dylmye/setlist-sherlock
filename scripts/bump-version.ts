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

const updateAndroid = async (version: string): Promise<void> => {
  console.log("Updating build.gradle...");
  const filename = "./android/app/build.gradle";
  let buildGradle = await Bun.file(filename).text();
  buildGradle = buildGradle.replace(
    /(\s+versionName\s")(.+)(")/,
    `$1${version}$3`,
  );
  try {
    await Bun.write(filename, buildGradle);
  } catch {
    throw new Error("Unable to update build.gradle");
  }
  console.log("Updated build.gradle\n");
};

type FdroidMetadata = {
  Builds: {
    versionName: string;
    versionCode: number;
    commit: string;
    subdir: string;
    gradle: string[];
  }[];
  CurrentVersion: string;
  CurrentVersionCode: number;
};

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
        subdir: "android",
        gradle: ['yes'],
      },
    ],
  };

  // we have to use yes instead of true due to fdroid's formatter! fun!
  const dumpedYaml = dump(Object.assign(fdroidYaml, yamlUpdates)).replaceAll("'yes'", "yes");

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
  await updateAndroid(versionNumber);
  await updateFdroid(versionNumber);
  console.log("all done :)");
};
//////////////////////////////////////////////////
main();
