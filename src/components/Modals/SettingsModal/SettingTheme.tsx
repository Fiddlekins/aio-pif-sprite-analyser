import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {DarkModeSharp, WbSunnySharp} from "@mui/icons-material";
import {ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback} from "react";
import {settings$} from "../../../state/settings.ts";
import {Setting} from "./Setting.tsx";

export const SettingTheme = observer(function SettingTheme() {
  const themeId = settings$.themeId.get();

  const handleThemeChange = useCallback((_event: MouseEvent<HTMLElement>, themeIdNew: string | null) => {
    if (themeIdNew) {
      settings$.themeId.set(themeIdNew);
    }
  }, []);

  return (
    <Setting
      label={(
        <Typography>
          <Trans>
            Theme
          </Trans>
        </Typography>
      )}
      control={(
        <ToggleButtonGroup
          value={themeId}
          exclusive
          color="primary"
          onChange={handleThemeChange}
        >
          <ToggleButton
            value="system"
          >
            <Trans>
              System
            </Trans>
          </ToggleButton>
          <ToggleButton
            value="light"
          >
            <WbSunnySharp/>
          </ToggleButton>
          <ToggleButton
            value="dark"
          >
            <DarkModeSharp/>
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    />
  );
});
