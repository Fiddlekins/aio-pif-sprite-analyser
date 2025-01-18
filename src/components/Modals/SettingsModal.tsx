import {observer} from "@legendapp/state/react";
import {Trans, useLingui} from "@lingui/react/macro";
import {DarkModeSharp, ExpandMoreSharp, HelpOutlineSharp, TranslateSharp, WbSunnySharp} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {ChangeEvent, Fragment, MouseEvent, ReactNode, SyntheticEvent, useCallback, useMemo} from "react";
import {localeToNameMap, nameToLocaleMap, pseudoLocale} from "../../i18n.ts";
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
  const locale = settings$.locale.get();
  const themeId = settings$.themeId.get();
  const isCanvasAccelerationEnabled = settings$.isCanvasAccelerationEnabled.get();
  const isIgnoreColouredTransparencyEnabled = settings$.isIgnoreColouredTransparencyEnabled.get();
  const isExportCopyingEnabled = settings$.isExportCopyingEnabled.get();

  const {t} = useLingui();
  const languageOptions = useMemo(() => {
    const languageOptionsNew = [t`Autodetect`, ...Object.keys(nameToLocaleMap)];
    if (import.meta.env.DEV) {
      languageOptionsNew.push('Debug Mode');
    }
    return languageOptionsNew;
  }, [t]);

  const handleClose = useCallback(() => {
    ui$.isSettingsModalOpen.set(false);
  }, []);

  const onLanguageChange = useCallback((_event: SyntheticEvent, newValue: string | null) => {
    if (newValue) {
      if (newValue === 'Debug Mode') {
        settings$.locale.set(pseudoLocale);
      } else {
        settings$.locale.set(nameToLocaleMap[newValue] || 'autodetect');
      }
    } else {
      settings$.locale.set('autodetect');
    }
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
      title={t`Settings`}
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
          <TranslateSharp/>
          <Autocomplete
            value={locale === pseudoLocale ? 'Debug Mode' : localeToNameMap[locale] || t`Autodetect`}
            onChange={onLanguageChange}
            renderInput={(params) => <TextField {...params} label={t`Language`}/>}
            options={languageOptions}
            sx={{flexGrow: 2}}
          />
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={2}
        >
          <Typography>
            <Trans>
              Theme
            </Trans>
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
              <Trans>
                Canvas Acceleration
              </Trans>
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
                      <Trans>
                        Canvas Acceleration
                      </Trans>
                    </Typography>
                    <Typography variant={'body2'}>
                      <Trans>
                        Leave this enabled unless you get corrupted images displaying, as it is faster and more
                        accurate. Some browsers feature privacy settings that cause the Canvas API to output randomised
                        image data, at which point Canvas Acceleration should be disabled.
                      </Trans>
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
              <Trans>
                Ignore Coloured Transparency
              </Trans>
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
                      <Trans>
                        Ignore Coloured Transparency
                      </Trans>
                    </Typography>
                    <Typography variant={'body2'}>
                      <Trans>
                        The application will skip over the coloured transparency analysis when determining which view
                        the app should automatically navigate to after importing a sprite. This makes the experience
                        smoother for users who prefer to ignore this non-critical aspect.
                      </Trans>
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
              <Trans>
                Advanced
              </Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SettingsBox>
              <Typography variant={'body2'}>
                <Trans>
                  The following settings disable some of the safety rails built into the application. Please only use
                  them if you know what you're doing.
                </Trans>
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
                    <Trans>
                      Allow export copying
                    </Trans>
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
                            <Trans>
                              Allow export copying
                            </Trans>
                          </Typography>
                          <Typography variant={'body2'}>
                            <Trans>
                              Browsers re-encode images when they are copied to the clipboard, in order to prevent
                              malicious websites from exploiting applications the browser may paste into.
                            </Trans>
                          </Typography>
                          <Typography variant={'body2'}>
                            <Trans>
                              This re-encoding produces bloated PNG images and ignores indexed mode, making the export
                              process pointless.
                            </Trans>
                          </Typography>
                          <Typography variant={'body2'}>
                            <Trans>
                              Power users may however wish to use the application to quickly rescale sprites before
                              pasting the result into an image editor, where this re-encoding does not cause problems.
                              Enabling this setting permits this workflow.
                            </Trans>
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
