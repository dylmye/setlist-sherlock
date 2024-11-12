import type { LinguiConfig } from "@lingui/conf";
import { formatter } from "@lingui/format-po";

export default {
  locales: ["en_GB", "es_ES", "fr_FR", "de_DE", "pt_BR", "tr_TR", "it_IT", "pl_PL"],
  sourceLocale: "en_GB",
  catalogs: [
    {
      path: "locales/{locale}/messages",
      include: ["app", "components", "hooks", "utils"],
    },
  ],
  format: formatter(),
} as LinguiConfig
