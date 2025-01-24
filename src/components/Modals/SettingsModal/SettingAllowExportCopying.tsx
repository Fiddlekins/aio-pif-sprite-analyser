import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {Box, Switch, Typography} from "@mui/material";
import {ChangeEvent, Fragment, useCallback} from "react";
import {settings$} from "../../../state/settings.ts";
import {Setting} from "./Setting.tsx";

export const SettingAllowExportCopying = observer(function SettingAllowExportCopying() {
  const isExportCopyingEnabled = settings$.isExportCopyingEnabled.get();

  const handleExportCopyingEnabledChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    settings$.isExportCopyingEnabled.set(event.target.checked);
  }, []);

  return (
    <Setting
      label={(
        <Typography>
          <Trans>
            Allow Export Copying
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
                Allow Export Copying
              </Trans>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                Browsers re-encode images when they are copied to the clipboard, in order to prevent malicious websites
                from exploiting applications the browser may paste into.
              </Trans>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                This re-encoding produces bloated PNG images and ignores indexed mode, making the export process
                pointless.
              </Trans>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                Power users may however wish to use the application to quickly rescale sprites before pasting the result
                into an image editor, where this re-encoding does not cause problems. Enabling this setting permits this
                workflow.
              </Trans>
            </Typography>
          </Box>
        </Fragment>
      )}
      control={(
        <Switch
          checked={isExportCopyingEnabled}
          onChange={handleExportCopyingEnabledChange}
        />
      )}
    />
  );
});
