import type { LinguiConfig } from "@lingui/conf";
import { formatter } from "@lingui/format-po";

export default {
  locales: ["en_GB", "fr_FR"],
  sourceLocale: "en_GB",
  catalogs: [
    {
      path: "locales/{locale}/messages",
      include: ["app", "components", "hooks", "utils"],
    },
  ],
  format: formatter(),
} as LinguiConfig
