import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {Box, Switch, Typography} from "@mui/material";
import {ChangeEvent, Fragment, useCallback} from "react";
import {settings$} from "../../../state/settings.ts";
import {Setting} from "./Setting.tsx";

export const SettingIgnoreColouredTransparency = observer(function SettingIgnoreColouredTransparency() {
  const isIgnoreColouredTransparencyEnabled = settings$.isIgnoreColouredTransparencyEnabled.get();

  const handleIgnoreColouredTransparencyEnabledChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    settings$.isIgnoreColouredTransparencyEnabled.set(event.target.checked);
  }, []);

  return (
    <Setting
      label={(
        <Typography>
          <Trans>
            Ignore Coloured Transparency
          </Trans>
        </Typography>
      )}
      tooltip={(
        <Fragment>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'left'}
            gap={0.5}
          >
            <Typography variant={'h6'}>
              <Trans>
                Ignore Coloured Transparency
              </Trans>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                The application will skip over the coloured transparency analysis when determining which view the app
                should automatically navigate to after importing a sprite. This makes the experience smoother for users
                who prefer to ignore this non-critical aspect.
              </Trans>
            </Typography>
          </Box>
        </Fragment>
      )}
      control={(
        <Switch
          checked={isIgnoreColouredTransparencyEnabled}
          onChange={handleIgnoreColouredTransparencyEnabledChange}
        />
      )}
    />
  );
});
