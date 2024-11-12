import {Observable} from "@legendapp/state";
import {Memo} from "@legendapp/state/react";
import {DarkModeSharp, WbSunnySharp, WbTwilightSharp} from "@mui/icons-material";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {MouseEvent} from "react";
import {battleAssetManifest} from "../../../data/battleAssetManifest.ts";
import {backgroundSettings$} from "../../../state/background.ts";
import {getValidTimeForMap} from "../../../utils/image/getValidTimeForMap.ts";

interface BattlerTimeButtonProps {
  battlerTime: 'day' | 'eve' | 'night';
  battlerMap$: Observable<string>;
}

function BattlerTimeButton(
  {
    battlerTime,
    battlerMap$,
  }: BattlerTimeButtonProps
) {
  return (
    <Memo>
      {() => {
        const battlerMap = battlerMap$.get();
        return (
          <ToggleButton
            value={battlerTime}
            disabled={!battleAssetManifest[battlerMap][battlerTime]}
            sx={{width: '56px'}}
          >
            {battlerTime === 'day' && (<WbSunnySharp/>)}
            {battlerTime === 'eve' && (<WbTwilightSharp/>)}
            {battlerTime === 'night' && (<DarkModeSharp/>)}
          </ToggleButton>
        );
      }}
    </Memo>
  );
}

export function BattlerTimeControls() {
  return (
    <Memo>
      {() => {
        const battlerMap = backgroundSettings$.battlerMap.get();
        const battlerTime = backgroundSettings$.battlerTime.get();
        return (
          <ToggleButtonGroup
            value={getValidTimeForMap(battlerMap, battlerTime)}
            exclusive
            color="primary"
            onChange={(_event: MouseEvent<HTMLElement>, battlerTimeNew: string | null) => {
              if (battlerTimeNew) {
                backgroundSettings$.battlerTime.set(battlerTimeNew);
              }
            }}
          >
            <BattlerTimeButton battlerTime={'day'} battlerMap$={backgroundSettings$.battlerMap}/>
            <BattlerTimeButton battlerTime={'eve'} battlerMap$={backgroundSettings$.battlerMap}/>
            <BattlerTimeButton battlerTime={'night'} battlerMap$={backgroundSettings$.battlerMap}/>
          </ToggleButtonGroup>
        );
      }}
    </Memo>
  );
}
