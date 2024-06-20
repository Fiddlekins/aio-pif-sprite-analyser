import {DarkModeSharp, WbSunnySharp} from "@mui/icons-material";
import {Box, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback, useContext} from "react";
import {SettingsContext} from "../../contexts/SettingsContext.tsx";
import {StyledModal} from "./StyledModal.tsx";

export function SettingsModal() {
  const {isSettingsModalOpen, setIsSettingsModalOpen, themeId, setThemeId} = useContext(SettingsContext);

  const handleClose = useCallback(() => {
    setIsSettingsModalOpen(false);
  }, [setIsSettingsModalOpen]);

  const handleThemeChange = useCallback((_event: MouseEvent<HTMLElement>, themeIdNew: string | null) => {
    if (themeIdNew) {
      setThemeId(themeIdNew);
    }
  }, [setThemeId]);

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
      </Box>
    </StyledModal>
  )
}
