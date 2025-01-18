import type {LinguiConfig} from "@lingui/conf";

const config: LinguiConfig = {
  sourceLocale: "en-GB",
  locales: [
    "en-GB",
    "en-US",
    "pseudo-LOCALE",
  ],
  pseudoLocale: "pseudo-LOCALE",
  fallbackLocales: {
    "en": "en-GB",
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
