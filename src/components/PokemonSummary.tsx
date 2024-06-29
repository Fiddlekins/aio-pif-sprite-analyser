import {Box} from "@mui/material";
import {useCallback, useContext, useState} from "react";
import {AnalysisContext} from "../contexts/AnalysisContext.tsx";
import {PokemonSelectModal} from "./Modals/PokemonSelectModal.tsx";
import {PokemonDisplay} from "./PokemonDisplay.tsx";

export function PokemonSummary() {
  const {headId, bodyId, setHeadId, setBodyId} = useContext(AnalysisContext);

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
      flexDirection={'row'}
      gap={2}
    >
      <PokemonDisplay
        label={'Head'}
        isFusion={false}
        pokemonId={headId}
        onClick={onHeadDisplayClick}
      />
      <PokemonDisplay
        label={'Body'}
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
        setPokemonId={setHeadId}
        handleClose={handleHeadModalClose}
        title={'Select Head Pokemon'}
      />
      <PokemonSelectModal
        open={isBodyModalOpen}
        pokemonId={bodyId}
        setPokemonId={setBodyId}
        handleClose={handleBodyModalClose}
        title={'Select Body Pokemon'}
      />
    </Box>
  );
}
