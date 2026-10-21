import {Box, Typography} from "@mui/material";
import {useMemo} from "react";
import {getHex6FromColourKey} from "../../utils/image/conversion/getHex6FromColourKey.ts";
import {getHex8FromColourKey} from "../../utils/image/conversion/getHex8FromColourKey.ts";
import {ColourSwatch} from "../ColourSwatch.tsx";

function copyColourToClipboard(colourString: string) {
  navigator.clipboard.writeText(colourString).catch(console.error);
}

export interface ColourCellProps {
  colourKey: number;
}

export function ColourCell(
  {
    colourKey,
  }: ColourCellProps
) {
  return useMemo(() => {
    const hex6 = getHex6FromColourKey(colourKey).toUpperCase();
    return (
      <Box
        width={'fit-content'}
        pl={'1px'}
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={1}
        style={{cursor: 'copy'}}
        onClick={() => copyColourToClipboard(hex6)}
      >
        <ColourSwatch colour={`#${getHex8FromColourKey(colourKey)}`}/>
        <Typography fontFamily={'monospace'}>
          {hex6}
        </Typography>
      </Box>
    );
  }, [colourKey]);
}
