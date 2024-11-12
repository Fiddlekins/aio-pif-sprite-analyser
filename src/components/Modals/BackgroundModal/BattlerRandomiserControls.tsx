import {beginBatch, endBatch} from "@legendapp/state";
import {Memo} from "@legendapp/state/react";
import {ShuffleSharp} from "@mui/icons-material";
import {battlerMaps, battlerTimes} from "../../../data/battleAssetManifest.ts";
import {backgroundSettings$} from "../../../state/background.ts";
import {StyledIconButton} from "../../StyledIconButton.tsx";

export function BattlerRandomiserControls() {
  return (
    <Memo>
      {() => {
        return (
          <StyledIconButton
            variant={'outlined'}
            onClick={() => {
              const battlerMapNew = battlerMaps[Math.floor(Math.random() * battlerMaps.length)];
              const battlerTimeNew = battlerTimes[Math.floor(Math.random() * battlerTimes.length)];
              beginBatch();
              backgroundSettings$.battlerMap.set(battlerMapNew);
              backgroundSettings$.battlerTime.set(battlerTimeNew);
              endBatch();
            }}
            sx={{width: '56px'}}
          >
            <ShuffleSharp/>
          </StyledIconButton>
        );
      }}
    </Memo>
  );
}
