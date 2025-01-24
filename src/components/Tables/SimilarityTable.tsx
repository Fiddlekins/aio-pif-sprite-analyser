import {observer} from "@legendapp/state/react";
import {Trans, useLingui} from "@lingui/react/macro";
import {ExpandMoreSharp} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import {useCallback, useMemo} from "react";
import {analysis$} from "../../state/analysis.ts";
import {ui$} from "../../state/ui.ts";
import {formatDecimalLargeFixed} from "../../utils/formatStyles.ts";
import {getHex6FromColourKey} from "../../utils/image/conversion/getHex6FromColourKey.ts";
import {getHex8FromColourKey} from "../../utils/image/conversion/getHex8FromColourKey.ts";
import {numberComparator} from "../../utils/numberComparator.ts";
import {ColourSwatch} from "../ColourSwatch.tsx";
import {VerdictIcon} from "../VerdictIcon.tsx";
import {LongRichTable} from "./RichTable/LongRichTable.tsx";
import {RichTable} from "./RichTable/RichTable.tsx";
import {Column, OrderDirection, RowComparator, RowDataBase} from "./RichTable/types.ts";

const checkboxRelativeWidth = 2;

interface RowData extends RowDataBase {
  colourPairKey: string;
  colourAKey: number;
  colourBKey: number;
  deltaE2000: number;
  deltaECMCAB: number;
  deltaECMCBA: number;
  deltaFusionBot: number;
  similarity: number;
}

export const SimilarityTable = observer(function SimilarityTable() {
  const numberLocale = ui$.numberLocale.get();
  const colourReport = analysis$.colourReport.get();

  const {t} = useLingui();

  const columns: Column[] = useMemo(() => {
    return [
      {
        id: 'colourA',
        label: t`Colour A`,
        relativeWidth: 4,
      },
      {
        id: 'colourB',
        label: t`Colour B`,
        relativeWidth: 4,
      },
      {
        id: 'similarity',
        label: t`Similarity`,
        sortable: true,
        align: 'right',
        relativeWidth: 3,
      },
      // {
      //   id: 'deltaE2000',
      //   label: 'deltaE2000',
      //   sortable: true,
      //   align: 'right',
      //   relativeWidth: 3,
      // },
      // {
      //   id: 'deltaECMC',
      //   label: 'deltaECMC',
      //   sortable: true,
      //   align: 'right',
      //   relativeWidth: 3,
      // },
      // {
      //   id: 'deltaFusionBot',
      //   label: 'deltaFusionBot',
      //   sortable: true,
      //   align: 'right',
      //   relativeWidth: 3,
      // },
    ];
  }, [t]);

  const rowDataUnsorted = useMemo(() => {
    if (!colourReport) {
      return [];
    }

    return [...colourReport.analysis.similarColourPairMap.entries()]
      .map(([colourPairKey, data]) => {
        const row: RowData = {
          ...data,
          id: colourPairKey,
          colourPairKey,
        };
        return row;
      })
  }, [colourReport]);

  const getCell = useCallback((row: RowData, columnId: string) => {
    switch (columnId) {
      case 'colourA':
        return (
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={1}
            onMouseEnter={() => {
              ui$.highlight.addHoveredColourToCurrent(row.colourAKey);
            }}
            onMouseLeave={() => {
              ui$.highlight.removeHoveredColourFromCurrent(row.colourAKey);
            }}
          >
            <ColourSwatch colour={`#${getHex8FromColourKey(row.colourAKey)}`}/>
            <Typography fontFamily={'monospace'}>
              {getHex6FromColourKey(row.colourAKey).toUpperCase()}
            </Typography>
          </Box>
        );
      case 'colourB':
        return (
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={1}
            onMouseEnter={() => {
              ui$.highlight.addHoveredColourToCurrent(row.colourBKey);
            }}
            onMouseLeave={() => {
              ui$.highlight.removeHoveredColourFromCurrent(row.colourBKey);
            }}
          >
            <ColourSwatch colour={`#${getHex8FromColourKey(row.colourBKey)}`}/>
            <Typography fontFamily={'monospace'}>
              {getHex6FromColourKey(row.colourBKey).toUpperCase()}
            </Typography>
          </Box>
        );
      case 'deltaE2000':
        return formatDecimalLargeFixed(numberLocale, row.deltaE2000);
      case 'deltaECMCAB':
        return formatDecimalLargeFixed(numberLocale, row.deltaECMCAB);
      case 'deltaECMCBA':
        return formatDecimalLargeFixed(numberLocale, row.deltaECMCBA);
      case 'deltaFusionBot':
        return formatDecimalLargeFixed(numberLocale, row.deltaFusionBot);
      case 'similarity':
        return formatDecimalLargeFixed(numberLocale, row.similarity);
    }
    throw new Error(`Unhandled columnId ${columnId}`);
  }, [numberLocale]);

  const rowComparator: RowComparator<RowData> = useCallback((a, b, orderBy: string, orderDirection: OrderDirection) => {
    let result = 0;
    switch (orderBy) {
      case 'deltaE2000':
        result = numberComparator(a.deltaE2000, b.deltaE2000);
        break;
      case 'deltaECMCAB':
        result = numberComparator(a.deltaECMCAB, b.deltaECMCAB);
        break;
      case 'deltaECMCBA':
        result = numberComparator(a.deltaECMCBA, b.deltaECMCBA);
        break;
      case 'deltaFusionBot':
        result = numberComparator(a.deltaFusionBot, b.deltaFusionBot);
        break;
      case 'similarity':
        result = numberComparator(a.similarity, b.similarity);
        break;
    }
    return orderDirection === 'asc' ? result : -result;
  }, []);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
    >
      <Box>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreSharp/>}
          >
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
              <VerdictIcon verdict={colourReport?.colourSimilarityVerdict || null}/>
              <Typography>
                <Trans>
                  Similar Colour Pairs
                </Trans>
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {rowDataUnsorted.length > 32 ? (
              <LongRichTable
                columns={columns}
                rows={rowDataUnsorted}
                defaultOrderBy={'similarity'}
                defaultOrderDirection={'desc'}
                rowComparator={rowComparator}
                getCell={getCell}
                checkboxRelativeWidth={checkboxRelativeWidth}
                minWidth={300}
              />
            ) : (
              <RichTable
                columns={columns}
                rows={rowDataUnsorted}
                defaultOrderBy={'similarity'}
                defaultOrderDirection={'desc'}
                rowComparator={rowComparator}
                getCell={getCell}
                checkboxRelativeWidth={checkboxRelativeWidth}
                minWidth={300}
              />
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
});
