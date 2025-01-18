import {i18n} from "@lingui/core";
import config from "../lingui.config.ts";

const defaultLocale = 'en-GB';

export const validLocales = config.locales;
export const pseudoLocale = config.pseudoLocale!;

export const localeToNameMap: Record<string, string> = {
  'en-GB': 'English (United Kingdom)',
  'en-US': 'English (United States)',
};
export const nameToLocaleMap: Record<string, string> = {};
for (const locale of validLocales) {
  if (locale === pseudoLocale) {
    continue;
  }
  const name = localeToNameMap[locale];
  if (!name && locale !== pseudoLocale) {
    throw new Error(`Missing name for locale ${locale}`)
  }
  nameToLocaleMap[name] = locale;
}

function firstValue<T>(input: T | T[]): T {
  if (Array.isArray(input)) {
    const [val1] = input;
    return val1;
  }
  return input;
}

export function resolveLocale(requestedLocale: string): string {
  if (requestedLocale === 'autodetect') {
    for (const locale of navigator.languages) {
      if (validLocales.includes(locale)) {
        return locale;
      }
      if (config.fallbackLocales && config.fallbackLocales[locale]) {
        return firstValue(config.fallbackLocales[locale]);
      }
      const [language] = locale.split('-');
      if (validLocales.includes(language)) {
        return language;
      }
      if (config.fallbackLocales && config.fallbackLocales[language]) {
        return firstValue(config.fallbackLocales[language]);
      }
    }
    return defaultLocale;
  }
  if (validLocales.includes(requestedLocale)) {
    return requestedLocale;
  }
  if (config.fallbackLocales && config.fallbackLocales[requestedLocale]) {
    return firstValue(config.fallbackLocales[requestedLocale]);
  }
  const [language] = requestedLocale.split('-');
  if (validLocales.includes(language)) {
    return language;
  }
  if (config.fallbackLocales && config.fallbackLocales[language]) {
    return firstValue(config.fallbackLocales[language]);
  }
  return defaultLocale;
}

export async function loadCatalog(locale: string) {
  const {messages} = await import(`./locales/${locale}.po`)
  i18n.loadAndActivate({locale, messages})
}
