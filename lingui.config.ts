import type {LinguiConfig} from "@lingui/conf";

const config: LinguiConfig = {
  sourceLocale: "en-GB",
  locales: [
    "de-DE",
    "en-GB",
    "en-US",
    "pl",
    "ru-RU",
    "pseudo-LOCALE",
  ],
  pseudoLocale: "pseudo-LOCALE",
  fallbackLocales: {
    "de": "de-DE",
    "en": "en-GB",
    "ru": "ru-RU",
    "pseudo-LOCALE": "en-GB",
    "default": "en-GB",
  },
  catalogs: [
    {
      path: "src/locales/{locale}",
      include: ["src/components"],
    },
  ],
  orderBy: 'origin',
}

export default config;
