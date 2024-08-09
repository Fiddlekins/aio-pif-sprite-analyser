import {DarkModeSharp, HelpOutlineSharp, WbSunnySharp} from "@mui/icons-material";
import {Box, Switch, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {ChangeEvent, Fragment, MouseEvent, useCallback, useContext} from "react";
import {SettingsContext} from "../../contexts/SettingsContext.tsx";
import {StyledTooltip} from "../StyledTooltip.tsx";
import {StyledModal} from "./StyledModal.tsx";

export function SettingsModal() {
  const {
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    themeId,
    setThemeId,
    canvasAccelerationEnabled,
    setCanvasAccelerationEnabled,
  } = useContext(SettingsContext);

  const handleClose = useCallback(() => {
    setIsSettingsModalOpen(false);
  }, [setIsSettingsModalOpen]);

  const handleThemeChange = useCallback((_event: MouseEvent<HTMLElement>, themeIdNew: string | null) => {
    if (themeIdNew) {
      setThemeId(themeIdNew);
    }
  }, [setThemeId]);

  const handleCanvasAccelerationEnabledChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCanvasAccelerationEnabled(event.target.checked);
  }, [setCanvasAccelerationEnabled]);

  return (
    <StyledModal
      title={'Settings'}
      open={isSettingsModalOpen}
      handleClose={handleClose}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'stretch'}
        gap={2}
      >
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
              value="light"
              sx={{width: '56px'}}
            >
              <WbSunnySharp/>
            </ToggleButton>
            <ToggleButton
              value="dark"
              sx={{width: '56px'}}
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
            checked={canvasAccelerationEnabled}
            onChange={handleCanvasAccelerationEnabledChange}
          />
        </Box>
      </Box>
    </StyledModal>
  )
}
