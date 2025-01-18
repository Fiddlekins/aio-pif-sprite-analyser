import {Memo} from "@legendapp/state/react";
import {useLingui} from "@lingui/react/macro";
import {Autocomplete, TextField} from "@mui/material";
import {SyntheticEvent, useCallback} from "react";
import {battlerMaps} from "../../../data/battleAssetManifest.ts";
import {backgroundSettings$} from "../../../state/background.ts";
import {ui$} from "../../../state/ui.ts";

export function BattlerMapControls() {
  const {t} = useLingui();

  const onBattlerMapChange = useCallback((_event: SyntheticEvent, battlerMapNew: string | null) => {
    if (battlerMapNew) {
      backgroundSettings$.battlerMap.set(battlerMapNew);
    }
  }, []);

  return (
    <Memo>
      {() => {
        const isMobile = ui$.isMobile.get();
        const battlerMap = backgroundSettings$.battlerMap.get();
        return (
          <Autocomplete
            value={battlerMap}
            onChange={onBattlerMapChange}
            renderInput={(params) => <TextField {...params} label={t`Map`}/>}
            options={battlerMaps}
            sx={isMobile ? {flexGrow: 2} : undefined}
          />
        );
      }}
    </Memo>
  );
}
