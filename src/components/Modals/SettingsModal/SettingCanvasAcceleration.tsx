import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {Box, Switch, Typography} from "@mui/material";
import {ChangeEvent, Fragment, useCallback} from "react";
import {settings$} from "../../../state/settings.ts";
import {Setting} from "./Setting.tsx";

export const SettingCanvasAcceleration = observer(function SettingCanvasAcceleration() {
  const isCanvasAccelerationEnabled = settings$.isCanvasAccelerationEnabled.get();

  const handleCanvasAccelerationEnabledChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    settings$.isCanvasAccelerationEnabled.set(event.target.checked);
  }, []);

  return (
    <Setting
      label={(
        <Typography>
          <Trans>
            Canvas Acceleration
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
                Canvas Acceleration
              </Trans>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                Leave this enabled unless you get corrupted images displaying, as it is faster and more
                accurate. Some browsers feature privacy settings that cause the Canvas API to output
                randomised
                image data, at which point Canvas Acceleration should be disabled.
              </Trans>
            </Typography>
          </Box>
        </Fragment>
      )}
      control={(
        <Switch
          checked={isCanvasAccelerationEnabled}
          onChange={handleCanvasAccelerationEnabledChange}
        />
      )}
    />
  );
});
