import {observer} from "@legendapp/state/react";
import {useLingui} from "@lingui/react/macro";
import {TranslateSharp} from "@mui/icons-material";
import {Autocomplete, TextField} from "@mui/material";
import {SyntheticEvent, useCallback, useMemo} from "react";
import {localeToNameMap, nameToLocaleMap, pseudoLocale} from "../../../i18n.ts";
import {settings$} from "../../../state/settings.ts";
import {Setting} from "./Setting.tsx";

export const SettingLanguage = observer(function SettingLanguage() {
  const languageLocale = settings$.languageLocale.get();

  const {t} = useLingui();
  const languageOptions = useMemo(() => {
    const languageOptionsNew = [t`Autodetect`, ...Object.keys(nameToLocaleMap)];
    if (import.meta.env.DEV) {
      languageOptionsNew.push('Debug Mode');
    }
    return languageOptionsNew;
  }, [t]);

  const onLanguageChange = useCallback((_event: SyntheticEvent, newValue: string | null) => {
    if (newValue) {
      if (newValue === 'Debug Mode') {
        settings$.languageLocale.set(pseudoLocale);
      } else {
        settings$.languageLocale.set(nameToLocaleMap[newValue] || 'autodetect');
      }
    } else {
      settings$.languageLocale.set('autodetect');
    }
  }, []);

  return (
    <Setting
      label={(
        <TranslateSharp/>
      )}
      control={(
        <Autocomplete
          value={languageLocale === pseudoLocale ? 'Debug Mode' : localeToNameMap[languageLocale] || t`Autodetect`}
          onChange={onLanguageChange}
          renderInput={(params) => <TextField {...params} label={t`Language`}/>}
          options={languageOptions}
          sx={{flexGrow: 2}}
        />
      )}
    />
  );
});
