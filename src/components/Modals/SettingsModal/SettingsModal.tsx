import {observer} from "@legendapp/state/react";
import {Trans, useLingui} from "@lingui/react/macro";
import {ExpandMoreSharp} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography} from "@mui/material";
import {ReactNode, useCallback} from "react";
import {ui$} from "../../../state/ui.ts";
import {ExternalLink} from "../../ExternalLink.tsx";
import {StyledModal} from "../StyledModal.tsx";
import {SettingAllowExportCopying} from "./SettingAllowExportCopying.tsx";
import {SettingCanvasAcceleration} from "./SettingCanvasAcceleration.tsx";
import {SettingIgnoreColouredTransparency} from "./SettingIgnoreColouredTransparency.tsx";
import {SettingLanguage} from "./SettingLanguage.tsx";
import {SettingNumberFormatting} from "./SettingNumberFormatting.tsx";
import {SettingTheme} from "./SettingTheme.tsx";

interface SettingsBoxProps {
  children?: ReactNode;
}

const ContentBox = function (
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

  const {t} = useLingui();

  const handleClose = useCallback(() => {
    ui$.isSettingsModalOpen.set(false);
  }, []);

  return (
    <StyledModal
      title={t`Settings`}
      open={isSettingsModalOpen}
      handleClose={handleClose}
    >
      <ContentBox>
        <Paper>
          <Box p={2}>
            <ContentBox>
              <SettingLanguage/>
              <SettingNumberFormatting/>
              <Typography variant={'body2'}>
                <Trans>
                  Spot some errors? Notice a missing language? Read more <ExternalLink
                  href={'https://github.com/Fiddlekins/aio-pif-sprite-analyser/blob/master/src/locales/README.md'}>here</ExternalLink> if
                  you're interested in helping!
                </Trans>
              </Typography>
            </ContentBox>
          </Box>
        </Paper>
        <Paper>
          <Box p={2}>
            <ContentBox>
              <SettingTheme/>
              <SettingCanvasAcceleration/>
              <SettingIgnoreColouredTransparency/>
            </ContentBox>
          </Box>
        </Paper>
      </ContentBox>

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
            <ContentBox>
              <Typography variant={'body2'}>
                <Trans>
                  The following settings disable some of the safety rails built into the application. Please only use
                  them if you know what you're doing.
                </Trans>
              </Typography>
              <SettingAllowExportCopying/>
            </ContentBox>
          </AccordionDetails>
        </Accordion>
      </div>
    </StyledModal>
  )
});
