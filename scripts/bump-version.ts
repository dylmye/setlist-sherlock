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
  const json = await Bun.file(filename).json();
  try {
    await Bun.write(
      filename,
      JSON.stringify(Object.assign(json, { version }), null, 2),
    );
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
        gradle: ["yes"],
      },
    ],
  };

  // we have to use yes instead of true due to fdroid's formatter! fun!
  // they also require dumb spacing
  const dumpedYaml = dump(Object.assign(fdroidYaml, yamlUpdates))
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
