import {observer} from "@legendapp/state/react";
import {DarkModeSharp, ExpandMoreSharp, HelpOutlineSharp, WbSunnySharp} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {ChangeEvent, Fragment, MouseEvent, ReactNode, useCallback} from "react";
import {settings$} from "../../state/settings.ts";
import {ui$} from "../../state/ui.ts";
import {StyledTooltip} from "../StyledTooltip.tsx";
import {StyledModal} from "./StyledModal.tsx";

interface SettingsBoxProps {
  children?: ReactNode;
}

const SettingsBox = function (
  {
    children
  }: SettingsBoxProps
) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'stretch'}
      gap={2}
    >
      {children}
    </Box>
  )
}

export const SettingsModal = observer(function SettingsModal() {
  const isSettingsModalOpen = ui$.isSettingsModalOpen.get();
  const themeId = settings$.themeId.get();
  const isCanvasAccelerationEnabled = settings$.isCanvasAccelerationEnabled.get();
  const isIgnoreColouredTransparencyEnabled = settings$.isIgnoreColouredTransparencyEnabled.get();
  const isExportCopyingEnabled = settings$.isExportCopyingEnabled.get();

  const handleClose = useCallback(() => {
    ui$.isSettingsModalOpen.set(false);
  }, []);

  const handleThemeChange = useCallback((_event: MouseEvent<HTMLElement>, themeIdNew: string | null) => {
    if (themeIdNew) {
      settings$.themeId.set(themeIdNew);
    }
  }, []);

  const handleCanvasAccelerationEnabledChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    settings$.isCanvasAccelerationEnabled.set(event.target.checked);
  }, []);

  const handleIgnoreColouredTransparencyEnabledChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    settings$.isIgnoreColouredTransparencyEnabled.set(event.target.checked);
  }, []);

  const handleExportCopyingEnabledChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    settings$.isExportCopyingEnabled.set(event.target.checked);
  }, []);

  return (
    <StyledModal
      title={'Settings'}
      open={isSettingsModalOpen}
      handleClose={handleClose}
    >
      <SettingsBox>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={2}
        >
          <Typography>
            Theme
          </Typography>
          <ToggleButtonGroup
            value={themeId}
            exclusive
            color="primary"
            onChange={handleThemeChange}
          >
            <ToggleButton
              value="system"
            >
              System
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
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={2}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={0.5}
          >
            <Typography>
              Canvas Acceleration
            </Typography>
            <StyledTooltip
              title={(
                <Fragment>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'left'}
                    gap={0.5}
                  >
                    <Typography variant={'h6'}>
                      Canvas Acceleration
                    </Typography>
                    <Typography variant={'body2'}>
                      {`Leave this enabled unless you get corrupted images displaying, as it is faster and more accurate. Some browsers feature privacy settings that cause the Canvas API to output randomised image data, at which point Canvas Acceleration should be disabled.`}
                    </Typography>
                  </Box>
                </Fragment>
              )}
              placement={'top'}
              arrow
            >
              <HelpOutlineSharp fontSize={'small'}/>
            </StyledTooltip>
          </Box>
          <Switch
            checked={isCanvasAccelerationEnabled}
            onChange={handleCanvasAccelerationEnabledChange}
          />
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={2}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={0.5}
          >
            <Typography>
              Ignore Coloured Transparency
            </Typography>
            <StyledTooltip
              title={(
                <Fragment>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'left'}
                    gap={0.5}
                  >
                    <Typography variant={'h6'}>
                      Ignore Coloured Transparency
                    </Typography>
                    <Typography variant={'body2'}>
                      {`The application will skip over the coloured transparency analysis when determining which view the app should automatically navigate to after importing a sprite. This makes the experience smoother for users who prefer to ignore this non-critical aspect.`}
                    </Typography>
                  </Box>
                </Fragment>
              )}
              placement={'top'}
              arrow
            >
              <HelpOutlineSharp fontSize={'small'}/>
            </StyledTooltip>
          </Box>
          <Switch
            checked={isIgnoreColouredTransparencyEnabled}
            onChange={handleIgnoreColouredTransparencyEnabledChange}
          />
        </Box>
      </SettingsBox>

      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreSharp/>}
          >
            <Typography variant={'h6'}>
              {'Advanced'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SettingsBox>
              <Typography variant={'body2'}>
                {`The following settings disable some of the safety rails built into the application. Please only use them if you know what you're doing.`}
              </Typography>
              <Box
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={2}
              >
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  gap={0.5}
                >
                  <Typography>
                    Allow export copying
                  </Typography>
                  <StyledTooltip
                    title={(
                      <Fragment>
                        <Box
                          display={'flex'}
                          flexDirection={'column'}
                          alignItems={'left'}
                          gap={0.5}
                        >
                          <Typography variant={'h6'}>
                            Allow export copying
                          </Typography>
                          <Typography variant={'body2'}>
                            {`Browsers re-encode images when they are copied to the clipboard, in order to prevent malicious websites from exploiting applications the browser may paste into.`}
                          </Typography>
                          <Typography variant={'body2'}>
                            {`This re-encoding produces bloated PNG images and ignores indexed mode, making the export process pointless.`}
                          </Typography>
                          <Typography variant={'body2'}>
                            {`Power users may however wish to use the application to quickly rescale sprites before pasting the result into an image editor, where this re-encoding does not cause problems. Enabling this setting permits this workflow.`}
                          </Typography>
                        </Box>
                      </Fragment>
                    )}
                    placement={'top'}
                    arrow
                  >
                    <HelpOutlineSharp fontSize={'small'}/>
                  </StyledTooltip>
                </Box>
                <Switch
                  checked={isExportCopyingEnabled}
                  onChange={handleExportCopyingEnabledChange}
                />
              </Box>
            </SettingsBox>
          </AccordionDetails>
        </Accordion>
      </div>
    </StyledModal>
  )
});
