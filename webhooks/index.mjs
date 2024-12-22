import { createHmac } from "crypto";

export const isVerifiedRequest = (payload, providedHash) => {
  const hmac = createHmac("sha1", process.env.HOOK_SECRET);
  hmac.update(payload);
  const determinedHash = `sha1=${hmac.digest("hex")}`;

  console.log(`Expecting hash: ${determinedHash}`);

  return determinedHash === providedHash;
};

/** @type import('aws-lambda').LambdaFunctionURLHandler */
export const handler = async ({ body, headers }) => {
  console.log("Body:", body);
  if (!isVerifiedRequest(body, headers["expo-signature"])) {
    throw new Error("Unexpected hash result");
  }

  const bodyDecoded = JSON.parse(body);

  if (bodyDecoded.platform !== "android") {
    console.log("Build platform isn't android, no further actions required");
    return;
  }

  const req = await fetch(
    "https://api.github.com/repos/dylmye/setlist-sherlock/actions/workflows/add-build-output-to-release.yml/dispatches",
    {
      method: "POST",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${process.env.GH_BEARER}`,
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          artifactUrl: bodyDecoded.artifacts.buildUrl,
          appVersion: bodyDecoded.metadata.appVersion,
        },
      }),
    },
  );

  if (req.status !== 204) {
    throw new Error(
      `Call to GitHub workflow didn't respond as expected: ${req.statusText}, ${req.toString()}`,
    );
  }
};
