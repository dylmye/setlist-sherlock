import { i18n, type I18n, type AllMessages } from "@lingui/core";
import { useLocales, type Locale } from "expo-localization";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useMemo } from "react";

import { messages as messagesDeDe } from "../locales/de_DE/messages.po";
import { messages as messagesEnGb } from "../locales/en_GB/messages.po";
import { messages as messagesEsEs } from "../locales/es_ES/messages.po";
import { messages as messagesFrFr } from "../locales/fr_FR/messages.po";
import { messages as messagesItIt } from "../locales/it_IT/messages.po";
import { messages as messagesPlPl } from "../locales/pl_PL/messages.po";
import { messages as messagesPtBr } from "../locales/pt_BR/messages.po";
import { messages as messagesTrTr } from "../locales/tr_TR/messages.po";

export const SETLIST_FM_API_LANGUAGE_STORAGE_KEY =
  "SETLIST_FM_API_LANGUAGE_STORAGE_KEY";

export const getLoadableTranslations = (): AllMessages => {
  return {
    en_GB: messagesEnGb,
    es_ES: messagesEsEs,
    fr_FR: messagesFrFr,
    de_DE: messagesDeDe,
    pt_BR: messagesPtBr,
    tr_TR: messagesTrTr,
    it_IT: messagesItIt,
    pl_PL: messagesPlPl,
  };
};

export const setApiLanguage = async ({
  languageCode,
}: Locale): Promise<void> => {
  const allTranslations = getLoadableTranslations();
  const allLanguageCodes = Object.keys(allTranslations).map(
    (k) => k.split("_")[0],
  );

  const currentSetApiLanguage = await getItemAsync(
    SETLIST_FM_API_LANGUAGE_STORAGE_KEY,
  );

  if (currentSetApiLanguage === languageCode) {
    return;
  }

  if (languageCode === null || !allLanguageCodes.includes(languageCode)) {
    await setItemAsync(SETLIST_FM_API_LANGUAGE_STORAGE_KEY, "en");
    return;
  }

  await setItemAsync(SETLIST_FM_API_LANGUAGE_STORAGE_KEY, languageCode);
};

/**
 * Get the closest available language to the user's. This is necessary because Apple makes up language tags.
 * If you set your language to French (Francais) and are based in the UK, Apple reports your language
 * as fr_GB when it should be fr_FR...
 */
export const getClosestAvailableLanguage = (
  primaryLang: string,
  availableLangs: string[],
): string => {
  if (availableLangs.includes(primaryLang)) return primaryLang;

  const availableLangsWithoutRegions = availableLangs.map(
    (a) => a.split("_")?.[0],
  );
  const primaryLangWithoutRegion = primaryLang.split("_")?.[0];

  if (availableLangsWithoutRegions.includes(primaryLangWithoutRegion))
    return availableLangs.find((a) => a.startsWith(primaryLangWithoutRegion))!;

  return availableLangs[0];
};

export const useSetLanguages = () => {
  const [primaryLocale] = useLocales();
  const loadableTranslations = getLoadableTranslations();

  return useMemo<I18n>(() => {
    i18n.load(loadableTranslations);
    i18n.activate(
      getClosestAvailableLanguage(
        primaryLocale.languageTag?.replace("-", "_"),
        Object.keys(loadableTranslations),
      ),
    );
    setApiLanguage(primaryLocale);
    return i18n;
  }, [i18n, loadableTranslations]);
};
