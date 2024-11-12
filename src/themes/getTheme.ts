import {darkTheme} from "./darkTheme.ts";
import {lightTheme} from "./lightTheme.ts";

export function getTheme(themeId?: string) {
  switch (themeId) {
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    case 'system':
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme;
  }
  return lightTheme;
}
