import {
  DarkModeSharp,
  HelpOutlineSharp,
  RestartAltSharp,
  ShuffleSharp,
  WbSunnySharp,
  WbTwilightSharp
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from "@mui/material";
import {ChangeEvent, Fragment, MouseEvent, SyntheticEvent, useCallback, useContext, useEffect, useState} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {BackgroundContext} from "../../contexts/BackgroundContext.tsx";
import {battleAssetManifest, battlerMaps, BattlerTime, battlerTimes} from "../../data/battleAssetManifest.ts";
import {getValidTimeForMap} from "../../utils/image/getValidTimeForMap.ts";
import {IntegerInput} from "../IntegerInput.tsx";
import {PokemonDisplay} from "../PokemonDisplay.tsx";
import {StyledIconButton} from "../StyledIconButton.tsx";
import {StyledModal} from "./StyledModal.tsx";

export function BackgroundModal() {
  const {bodyId} = useContext(AnalysisContext);
  const {
    isBackgroundModalOpen,
    setIsBackgroundModalOpen,
    battlerSceneImageData,
    overrideBody,
    setOverrideBody,
    overrideConfig,
    setOverrideConfig,
    battlerMap,
    setBattlerMap,
    battlerTime,
    setBattlerTime,
  } = useContext(BackgroundContext);
  const [battlerSceneCanvasRef, setBattlerSceneCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const backgroundCanvas = battlerSceneCanvasRef;
    if (backgroundCanvas && battlerSceneImageData) {
      const ctx = backgroundCanvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(battlerSceneImageData, 0, 0);
      }
    }
  }, [battlerSceneCanvasRef, battlerSceneImageData]);

  const handleClose = useCallback(() => {
    setIsBackgroundModalOpen(false);
  }, [setIsBackgroundModalOpen]);

  const setRef = useCallback((ref: HTMLCanvasElement | null) => {
    setBattlerSceneCanvasRef(ref);
  }, [setBattlerSceneCanvasRef]);

  const onBattlerMapChange = useCallback((_event: SyntheticEvent, battlerMapNew: string | null) => {
    if (battlerMapNew) {
      setBattlerMap(battlerMapNew);
    }
  }, [setBattlerMap]);

  const handleBattlerTimeChange = useCallback((_event: MouseEvent<HTMLElement>, battlerTimeNew: BattlerTime | null) => {
    if (battlerTimeNew) {
      setBattlerTime(battlerTimeNew);
    }
  }, [setBattlerTime]);

  const onShuffleClick = useCallback(() => {
    const battlerMapNew = battlerMaps[Math.floor(Math.random() * battlerMaps.length)];
    const battlerTimeNew = battlerTimes[Math.floor(Math.random() * battlerTimes.length)];
    setBattlerMap(battlerMapNew);
    setBattlerTime(battlerTimeNew);
  }, [setBattlerMap, setBattlerTime]);

  const handleOverrideBodyChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setOverrideBody(event.target.checked);
  }, [setOverrideBody])

  const onEnemyXChange = useCallback((enemyXNew: number) => {
    setOverrideConfig('enemyX', enemyXNew);
  }, [setOverrideConfig]);

  const onEnemyYChange = useCallback((enemyYNew: number) => {
    setOverrideConfig('enemyY', enemyYNew);
  }, [setOverrideConfig]);

  const onPlayerXChange = useCallback((playerXNew: number) => {
    setOverrideConfig('playerX', playerXNew);
  }, [setOverrideConfig]);

  const onPlayerYChange = useCallback((playerYNew: number) => {
    setOverrideConfig('playerY', playerYNew);
  }, [setOverrideConfig]);

  const onShadowXChange = useCallback((shadowXNew: number) => {
    setOverrideConfig('shadowX', shadowXNew);
  }, [setOverrideConfig]);

  const onShadowSizeChange = useCallback((shadowSizeNew: number) => {
    setOverrideConfig('shadowSize', shadowSizeNew);
  }, [setOverrideConfig]);

  const onAltitudeChange = useCallback((altitudeNew: number) => {
    setOverrideConfig('altitude', altitudeNew);
  }, [setOverrideConfig]);

  const onOverrideReset = useCallback(() => {
    setOverrideConfig('reset');
  }, [setOverrideConfig]);

  return (
    <StyledModal
      title={'Configure Battler'}
      open={isBackgroundModalOpen}
      handleClose={handleClose}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'stretch'}
        gap={2}
      >
        <canvas
          ref={setRef}
          width={1536}
          height={864}
        />
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
            <Autocomplete
              value={battlerMap}
              onChange={onBattlerMapChange}
              renderInput={(params) => <TextField {...params} label="Map"/>}
              options={battlerMaps}
              sx={{flexGrow: 2}}
            />
            <ToggleButtonGroup
              value={getValidTimeForMap(battlerMap, battlerTime)}
              exclusive
              color="primary"
              onChange={handleBattlerTimeChange}
            >
              <ToggleButton
                value="day"
                disabled={!battleAssetManifest[battlerMap].day}
                sx={{width: '56px'}}
              >
                <WbSunnySharp/>
              </ToggleButton>
              <ToggleButton
                value="eve"
                disabled={!battleAssetManifest[battlerMap].eve}
                sx={{width: '56px'}}
              >
                <WbTwilightSharp/>
              </ToggleButton>
              <ToggleButton
                value="night"
                disabled={!battleAssetManifest[battlerMap].night}
                sx={{width: '56px'}}
              >
                <DarkModeSharp/>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <StyledIconButton variant={'outlined'} onClick={onShuffleClick} sx={{width: '56px'}}>
            <ShuffleSharp/>
          </StyledIconButton>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={1}
        >
          <Typography variant={'h6'}>
            Sprite Position
          </Typography>
          <Tooltip
            title={(
              <Fragment>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'left'}
                  gap={0.5}
                >
                  <Typography variant={'h6'}>
                    Position Override
                  </Typography>
                  <Typography variant={'body2'}>
                    {`Pokemon Infinite Fusion uses the sprite position offsets configured for the body pokemon of the fusion when determining where to draw it.`}
                  </Typography>
                  <Typography variant={'body2'}>
                    {`This can be overridden using the settings below, but these changes will not transfer into the game.`}
                  </Typography>
                  <Typography variant={'body2'} fontWeight={'bold'}>
                    {`Be sure to use the body pokemon configuration when fine-tuning sprite placement.`}
                  </Typography>
                </Box>
              </Fragment>
            )}
            placement={'top'}
            arrow
          >
            <HelpOutlineSharp fontSize={'small'}/>
          </Tooltip>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          gap={2}
        >
          <Box>
            <PokemonDisplay
              label={'Body'}
              isFusion={false}
              pokemonId={bodyId}
              isDisabled={overrideBody}
            />
          </Box>
          <Switch
            checked={overrideBody}
            onChange={handleOverrideBodyChange}
            sx={{alignSelf: 'center'}}
          />
          <Box
            display={'grid'}
            gridTemplateColumns={'auto auto'}
            gap={1}
          >
            <IntegerInput
              label={'enemyX'}
              value={overrideConfig.enemyX}
              isDisabled={!overrideBody}
              onValueChange={onEnemyXChange}
              showArrowControls={true}
            />
            <IntegerInput
              label={'enemyY'}
              value={overrideConfig.enemyY}
              isDisabled={!overrideBody}
              onValueChange={onEnemyYChange}
              showArrowControls={true}
            />
            <IntegerInput
              label={'playerX'}
              value={overrideConfig.playerX}
              isDisabled={!overrideBody}
              onValueChange={onPlayerXChange}
              showArrowControls={true}
            />
            <IntegerInput
              label={'playerY'}
              value={overrideConfig.playerY}
              isDisabled={!overrideBody}
              onValueChange={onPlayerYChange}
              showArrowControls={true}
            />
            <IntegerInput
              label={'shadowX'}
              value={overrideConfig.shadowX}
              isDisabled={!overrideBody}
              onValueChange={onShadowXChange}
              showArrowControls={true}
            />
            <IntegerInput
              label={'shadowSize'}
              value={overrideConfig.shadowSize}
              min={0}
              max={5}
              isDisabled={!overrideBody}
              onValueChange={onShadowSizeChange}
              showArrowControls={true}
            />
            <IntegerInput
              label={'altitude'}
              value={overrideConfig.altitude}
              isDisabled={!overrideBody}
              onValueChange={onAltitudeChange}
              showArrowControls={true}
            />
            <Button
              variant={'outlined'}
              disabled={!overrideBody}
              onClick={onOverrideReset}
            >
              <RestartAltSharp/>
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </StyledModal>
  )
}
