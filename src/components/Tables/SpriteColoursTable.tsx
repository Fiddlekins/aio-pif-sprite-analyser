import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {ExpandMoreSharp} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import {ColorObject, HSL, HSV, to as convert} from "colorjs.io/fn";
import {useMemo} from "react";
import {analysis$} from "../../state/analysis.ts";
import {getPixelFromColourKey} from "../../utils/image/conversion/getPixelFromColourKey.ts";
import {VerdictIcon} from "../VerdictIcon.tsx";
import {ColoursTable} from "./ColoursTable.tsx";
import {RowDataBase} from "./RichTable/types.ts";

interface RowData extends RowDataBase {
  colour: ColorObject;
  colourKey: number;
  rgba: { r: number, g: number, b: number, a: number };
  hsva: ColorObject;
  hsla: ColorObject;
  isBackground: boolean;
  usage: number;
}

export const SpriteColoursTable = observer(function SpriteColoursTable() {
  const colourReport = analysis$.colourReport.get();

  const rowDataUnsorted = useMemo(() => {
    const colourAnalysisArrayNew = colourReport
      ? colourReport.analysis.getAsArray()
      : [];

    const nonBackgroundPixelCountNew = colourAnalysisArrayNew.reduce((acc, curr) => {
      if (curr.colour.alpha !== 0) {
        return acc + curr.count;
      }
      return acc;
    }, 0);

    const rowNonBackgroundDataUnsortedNew: RowData[] = [];
    colourReport?.analysis.getAsArray().forEach(({colour, colourKey, count}) => {
      const [r, g, b, a] = getPixelFromColourKey(colourKey);
      const rgba = {r, g, b, a};
      const hsva = convert(colour, HSV);
      const hsla = convert(colour, HSL);
      const isBackground = colour.alpha === 0;
      if (!isBackground) {
        const usage = count / nonBackgroundPixelCountNew;

        const row: RowData = {
          id: colourKey,
          colour,
          colourKey,
          rgba,
          hsva,
          hsla,
          isBackground,
          usage,
        };
        rowNonBackgroundDataUnsortedNew.push(row);
      }
    });

    return rowNonBackgroundDataUnsortedNew;
  }, [colourReport]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
    >
      <Box>
        <Accordion
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreSharp/>}
          >
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
              <VerdictIcon verdict={colourReport?.spriteColourCountVerdict || null}/>
              <Typography>
                <Trans>
                  Sprite Colours
                </Trans>
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <ColoursTable rowDataUnsorted={rowDataUnsorted}/>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
});
