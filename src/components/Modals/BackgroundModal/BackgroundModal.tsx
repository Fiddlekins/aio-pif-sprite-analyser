import {Memo, observer, useObserveEffect} from "@legendapp/state/react";
import {Trans, useLingui} from "@lingui/react/macro";
import {ExpandMoreSharp, HelpOutlineSharp, RestartAltSharp} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Switch, Typography} from "@mui/material";
import {ChangeEvent, Fragment, useCallback, useState} from "react";
import {pokemonIdToDataMap} from "../../../data/pokemonIdToDataMap.ts";
import {analysis$} from "../../../state/analysis.ts";
import {background$, backgroundSettings$} from "../../../state/background.ts";
import {ui$} from "../../../state/ui.ts";
import {IntegerInput} from "../../IntegerInput.tsx";
import {MissingPositionalDataTooltip} from "../../MissingPositionalDataTooltip.tsx";
import {PokemonDisplay} from "../../PokemonDisplay.tsx";
import {StyledTooltip} from "../../StyledTooltip.tsx";
import {StyledModal} from "../StyledModal.tsx";
import {BattlerMapControls} from "./BattlerMapControls.tsx";
import {BattlerRandomiserControls} from "./BattlerRandomiserControls.tsx";
import {BattlerTimeControls} from "./BattlerTimeControls.tsx";

function getCanvasEl() {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 864;
  canvas.style.width = '100%';
  return canvas;
}

export const BackgroundModal = observer(function BackgroundModal() {
  const isMobile = ui$.isMobile.get();
  const bodyId = analysis$.bodyId.get();
  const isMissingPositionalData = (bodyId !== undefined && pokemonIdToDataMap[bodyId || 0]?.isMissingPositionalData) || false;

  const {t} = useLingui();
  const [canvasEl] = useState(getCanvasEl);

  useObserveEffect(() => {
    const battlerSceneImageData = background$.battlerSceneImageData.get();
    const isBackgroundModalOpen = ui$.isBackgroundModalOpen.get();
    if (isBackgroundModalOpen && battlerSceneImageData) {
      const ctx = canvasEl.getContext('2d');
      if (ctx) {
        ctx.putImageData(battlerSceneImageData, 0, 0);
      }
    }
  });

  const handleClose = useCallback(() => {
    ui$.isBackgroundModalOpen.set(false);
  }, []);

  const onOverrideReset = useCallback(() => {
    background$.resetOverrideConfig();
  }, []);

  return (
    <StyledModal
      title={t`Configure Battler`}
      open={ui$.isBackgroundModalOpen.get()}
      handleClose={handleClose}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'stretch'}
        gap={2}
      >
        <Box position={'relative'}>
          <Memo>
            {() => {
              return (
                <div
                  ref={(ref) => ref?.appendChild(canvasEl)}
                  style={{lineHeight: 0}}
                />
              );
            }}
          </Memo>
          {isMissingPositionalData && (<MissingPositionalDataTooltip/>)}
        </Box>
        {isMobile ? (
          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={2}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
            >
              <BattlerMapControls/>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              <BattlerTimeControls/>
              <BattlerRandomiserControls/>
            </Box>
          </Box>
        ) : (
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={2}
          >
            <Box
              flexGrow={1}
              display={'grid'}
              gridTemplateColumns={'1fr auto'}
              gap={2}
            >
              <BattlerMapControls/>
              <BattlerTimeControls/>
            </Box>
            <BattlerRandomiserControls/>
          </Box>
        )}
        <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreSharp/>}
            >
              <Box
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={0.5}
              >
                <Typography variant={'h6'}>
                  <Trans>
                    Sprite Position Override
                  </Trans>
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={2}
              >
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  gap={1}
                >
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
                              Position Override
                            </Trans>
                          </Typography>
                          <Typography variant={'body2'}>
                            <Trans>
                              Pokemon Infinite Fusion uses the sprite position offsets configured for the body pokemon
                              of the fusion when determining where to draw it.
                            </Trans>
                          </Typography>
                          <Typography variant={'body2'}>
                            <Trans>
                              This can be overridden using the settings below, but these changes will not transfer into
                              the game.
                            </Trans>
                          </Typography>
                          <Typography variant={'body2'} fontWeight={'bold'}>
                            <Trans>
                              Be sure to use the body pokemon configuration when fine-tuning sprite placement.
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
                  <Typography variant={'body2'}>
                    <Trans>
                      The sprite position derived from the body pokemon can be overridden
                    </Trans>
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={isMobile ? 'column' : 'row'}
                  alignItems={'center'}
                  gap={2}
                >
                  <Memo>
                    {() => {
                      const bodyId = analysis$.bodyId.get();
                      const isOverrideBody = background$.isOverrideBody.get();
                      return (
                        <Box>
                          <PokemonDisplay
                            label={t`Body`}
                            isFusion={false}
                            pokemonId={bodyId}
                            isDisabled={isOverrideBody}
                          />
                        </Box>
                      );
                    }}
                  </Memo>
                  <Memo>
                    {() => {
                      const overrideConfig$ = backgroundSettings$.overrideConfig;
                      const isOverrideBody = background$.isOverrideBody.get();
                      return (
                        <>
                          <Switch
                            checked={isOverrideBody}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                              background$.isOverrideBody.set(event.target.checked);
                            }}
                            sx={{alignSelf: 'center'}}
                          />
                          <Box
                            display={'grid'}
                            gridTemplateColumns={'auto auto'}
                            gap={1}
                          >
                            <IntegerInput
                              label={'enemyX'}
                              value$={overrideConfig$.enemyX}
                              isDisabled={!isOverrideBody}
                              showArrowControls={true}
                            />
                            <IntegerInput
                              label={'enemyY'}
                              value$={overrideConfig$.enemyY}
                              isDisabled={!isOverrideBody}
                              showArrowControls={true}
                            />
                            <IntegerInput
                              label={'playerX'}
                              value$={overrideConfig$.playerX}
                              isDisabled={!isOverrideBody}
                              showArrowControls={true}
                            />
                            <IntegerInput
                              label={'playerY'}
                              value$={overrideConfig$.playerY}
                              isDisabled={!isOverrideBody}
                              showArrowControls={true}
                            />
                            <IntegerInput
                              label={'shadowX'}
                              value$={overrideConfig$.shadowX}
                              isDisabled={!isOverrideBody}
                              showArrowControls={true}
                            />
                            <IntegerInput
                              label={'shadowSize'}
                              value$={overrideConfig$.shadowSize}
                              min={0}
                              max={5}
                              isDisabled={!isOverrideBody}
                              showArrowControls={true}
                            />
                            <IntegerInput
                              label={'altitude'}
                              value$={overrideConfig$.altitude}
                              isDisabled={!isOverrideBody}
                              showArrowControls={true}
                            />
                            <Button
                              variant={'outlined'}
                              disabled={!isOverrideBody}
                              onClick={onOverrideReset}
                            >
                              <RestartAltSharp/>
                              <Trans>
                                Reset
                              </Trans>
                            </Button>
                          </Box>
                        </>
                      );
                    }}
                  </Memo>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </StyledModal>
  )
});
