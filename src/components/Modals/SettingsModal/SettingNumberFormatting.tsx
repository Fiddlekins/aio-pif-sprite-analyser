import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback} from "react";
import {settings$} from "../../../state/settings.ts";
import {Setting} from "./Setting.tsx";

export const SettingNumberFormatting = observer(function SettingNumberFormatting() {
  const numberLocale = settings$.numberLocale.get();

  const handleNumberLocaleChange = useCallback((_event: MouseEvent<HTMLElement>, numberLocaleNew: string | null) => {
    if (numberLocaleNew) {
      settings$.numberLocale.set(numberLocaleNew);
    }
  }, []);

  return (
    <Setting
      label={(
        <Typography>
          <Trans>
            Number Formatting
          </Trans>
        </Typography>
      )}
      control={(
        <ToggleButtonGroup
          value={numberLocale}
          exclusive
          color="primary"
          onChange={handleNumberLocaleChange}
        >
          <ToggleButton
            value="autodetect"
          >
            <Trans>
              Autodetect
            </Trans>
          </ToggleButton>
          <ToggleButton
            value="matchLanguage"
          >
            <Trans>
              Match Language
            </Trans>
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    />
  );
});
