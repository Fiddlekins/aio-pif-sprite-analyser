import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {ErrorOutlineSharp} from "@mui/icons-material";
import {Box, BoxProps, styled, Typography} from "@mui/material";
import React, {Fragment} from "react";
import {pokemonIdToDataMap} from "../data/pokemonIdToDataMap.ts";
import {analysis$} from "../state/analysis.ts";
import {StyledTooltip} from "./StyledTooltip.tsx";

const StyledBox = styled(Box)<BoxProps>(({theme}) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '50%',
  display: 'flex',
}));

const missingPositionalDataWarningStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
};

export const MissingPositionalDataTooltip = observer(function MissingPositionalDataTooltip() {
  const bodyPokemonId = analysis$.bodyId.get();
  const bodyPokemonName = pokemonIdToDataMap[bodyPokemonId || 0]?.displayName || 'missing pokemon';

  return (
    <StyledTooltip
      title={(
        <Fragment>
          <Typography variant={'h6'}>
            <Trans>
              Missing Position Data
            </Trans>
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={2}
          >
            <Typography variant={'body2'}>
              <Trans>
                The body pokemon ({bodyPokemonName} #{bodyPokemonId}) is missing positional data.
              </Trans>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                This means that the position of the background and the size of the shadow are not displayed by APSA as
                they will eventually appear in the game.
              </Trans>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                For the time being it is recommended to position your sprite to match the position of the body pokemon's
                base sprite. This makes it likely that the position will look correct when positional data is added
                later.
              </Trans>
            </Typography>
          </Box>
        </Fragment>
      )}
      placement={'top'}
      arrow
      spanStyle={missingPositionalDataWarningStyle}
    >
      <StyledBox m={0.5}>
        <ErrorOutlineSharp color={'error'}/>
      </StyledBox>
    </StyledTooltip>
  );
});
