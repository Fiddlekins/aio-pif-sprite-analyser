import {observer} from "@legendapp/state/react";
import {useLingui} from "@lingui/react/macro";
import {Box} from "@mui/material";
import {useCallback, useState} from "react";
import {analysis$} from "../state/analysis.ts";
import {ui$} from "../state/ui.ts";
import {PokemonSelectModal} from "./Modals/PokemonSelectModal.tsx";
import {PokemonDisplay} from "./PokemonDisplay.tsx";

export const PokemonSummary = observer(function PokemonSummary() {
  const isMobile = ui$.isMobile.get();
  const headId = analysis$.headId.get();
  const bodyId = analysis$.bodyId.get();

  const {t} = useLingui();
  const [isHeadModalOpen, setIsHeadModalOpen] = useState(false);
  const [isBodyModalOpen, setIsBodyModalOpen] = useState(false);

  const onHeadDisplayClick = useCallback(() => {
    setIsHeadModalOpen(true);
  }, [setIsHeadModalOpen]);

  const onBodyDisplayClick = useCallback(() => {
    setIsBodyModalOpen(true);
  }, [setIsBodyModalOpen]);

  const handleHeadModalClose = useCallback(() => {
    setIsHeadModalOpen(false);
  }, [setIsHeadModalOpen])

  const handleBodyModalClose = useCallback(() => {
    setIsBodyModalOpen(false);
  }, [setIsBodyModalOpen])

  return (
    <Box
      display={'flex'}
      flexDirection={isMobile ? 'column' : 'row'}
      gap={2}
    >
      <PokemonDisplay
        label={t`Head`}
        isFusion={false}
        pokemonId={headId}
        onClick={onHeadDisplayClick}
      />
      <PokemonDisplay
        label={t`Body`}
        isFusion={false}
        pokemonId={bodyId}
        onClick={onBodyDisplayClick}
      />
      <PokemonDisplay
        label={''}
        isFusion={true}
        headPokemonId={headId}
        bodyPokemonId={bodyId}
      />
      <PokemonSelectModal
        open={isHeadModalOpen}
        pokemonId={headId}
        setPokemonId={(headIdNew) => analysis$.headId.set(headIdNew)}
        handleClose={handleHeadModalClose}
        title={t`Select Head Pokémon`}
      />
      <PokemonSelectModal
        open={isBodyModalOpen}
        pokemonId={bodyId}
        setPokemonId={(bodyIdNew) => analysis$.bodyId.set(bodyIdNew)}
        handleClose={handleBodyModalClose}
        title={t`Select Body Pokémon`}
      />
    </Box>
  );
});
