import {ExpandMoreSharp} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {useCallback, useContext, useMemo, useState} from "react";
import tinycolor from "tinycolor2";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {getFormattedPercent} from "../../utils/getFormattedPercent.ts";
import {retrieveTyped} from "../../utils/localStorage/retrieveTyped.ts";
import {storeString} from "../../utils/localStorage/storeString.ts";
import {ColourSwatch} from "../ColourSwatch.tsx";
import {VerdictIcon} from "../VerdictIcon.tsx";
import {RichTable} from "./RichTable/RichTable.tsx";
import {Column, OrderDirection, RowComparator, RowDataBase} from "./RichTable/types.ts";

type ColourSpace = 'RGB' | 'HSV' | 'HSL';

const columns: Column[] = [
  {
    id: 'checkbox',
    label: '',
  },
  {
    id: 'colour',
    label: 'Colour',
  },
  {
    id: 'usage',
    label: 'Usage',
    sortable: true,
    align: 'right',
  },
  {
    id: 'channel0',
    label: 'Channel 0',
    sortable: true,
    align: 'right',
  },
  {
    id: 'channel1',
    label: 'Channel 1',
    sortable: true,
    align: 'right',
  },
  {
    id: 'channel2',
    label: 'Channel 2',
    sortable: true,
    align: 'right',
  },
  {
    id: 'channel3',
    label: 'Channel 3',
    sortable: true,
    align: 'right',
  },
]

interface RowData extends RowDataBase {
  colour: tinycolor.Instance;
  colourKey: string;
  rgba: tinycolor.ColorFormats.RGBA;
  hsva: tinycolor.ColorFormats.HSVA;
  hsla: tinycolor.ColorFormats.HSLA;
  isBackground: boolean;
  usage: number;
}

function getHeaderName(colourSpace: ColourSpace, channel: number) {
  switch (colourSpace) {
    case 'RGB':
      return ['R', 'G', 'B', 'A'][channel];
    case 'HSV':
      return ['H', 'S', 'V', 'A'][channel];
    case 'HSL':
      return ['H', 'S', 'L', 'A'][channel];
  }
}

function numberComparator(a: number, b: number) {
  if (a === b) {
    return 0
  }
  return a > b ? 1 : -1;
}

function getStoredColourSpace() {
  return retrieveTyped<ColourSpace>('ColoursTable.colourSpace', (value: string | null) => {
    switch (value) {
      case 'RGB':
      case 'HSV':
      case 'HSL':
        return value;
      default:
        return 'RGB';
    }
  });
}

export function ColoursTable() {
  const {
    colourReport,
    highlightedColourState,
    dispatchHighlightedColourState,
    highlightMode,
    setHighlightMode,
  } = useContext(AnalysisContext);

  const [colourSpace, setColourSpace] = useState<ColourSpace>(getStoredColourSpace());

  const {
    rowBackgroundDataUnsorted,
    rowNonBackgroundDataUnsorted,
  } = useMemo(() => {
    const colourAnalysisArrayNew = colourReport
      ? colourReport.analysis.getAsArray()
      : [];

    const backgroundPixelCountNew = colourAnalysisArrayNew.reduce((acc, curr) => {
      if (curr.colour.getAlpha() === 0) {
        return acc + curr.count;
      }
      return acc;
    }, 0);
    const nonBackgroundPixelCountNew = colourReport ? colourReport.analysis.pixelCount - backgroundPixelCountNew : 1;

    const rowBackgroundDataUnsortedNew: RowData[] = [];
    const rowNonBackgroundDataUnsortedNew: RowData[] = [];
    colourReport?.analysis.getAsArray().forEach(({colour, colourKey, count}) => {
      const rgba = colour.toRgb();
      const hsva = colour.toHsv();
      const hsla = colour.toHsl();
      const isBackground = rgba.a === 0;
      const usage = count / (isBackground ? backgroundPixelCountNew : nonBackgroundPixelCountNew);

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
      (isBackground ? rowBackgroundDataUnsortedNew : rowNonBackgroundDataUnsortedNew).push(row);
    })

    return {
      backgroundPixelCount: backgroundPixelCountNew,
      nonBackgroundPixelCount: nonBackgroundPixelCountNew,
      rowBackgroundDataUnsorted: rowBackgroundDataUnsortedNew,
      rowNonBackgroundDataUnsorted: rowNonBackgroundDataUnsortedNew,
    }
  }, [colourReport]);

  const onCheckboxChange = useCallback(({colourKey}: RowData, isCheckedNew: boolean) => {
    if (isCheckedNew) {
      dispatchHighlightedColourState({operation: 'check', colourKey});
    } else {
      dispatchHighlightedColourState({operation: 'uncheck', colourKey});
    }
  }, [dispatchHighlightedColourState]);

  const checkboxesChecked = useMemo(() => {
    const checkboxesCheckedNew: Record<string, boolean> = {};
    [...highlightedColourState.checked].forEach((colourKey) => {
      checkboxesCheckedNew[colourKey] = true;
    })
    return checkboxesCheckedNew;
  }, [
    // Object ref always changes so convert to stable string
    [...highlightedColourState.checked].join(','),
  ]);

  const getHeaderCell = useCallback((column: Column) => {
    switch (column.id) {
      case 'channel0':
      case 'channel1':
      case 'channel2':
      case 'channel3':
        return getHeaderName(colourSpace, parseInt(column.id.slice(-1), 10));
      default:
        return column.label;
    }
  }, [colourSpace]);

  const getCell = useCallback((row: RowData, columnId: string) => {
    switch (columnId) {
      case 'colour':
        return (
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={1}
          >
            <ColourSwatch colour={`#${row.colourKey}`}/>
            <Typography fontFamily={'monospace'}>
              {row.colour.toHexString().toUpperCase()}
            </Typography>
          </Box>
        );
      case 'usage':
        return getFormattedPercent(row.usage);
      case 'channel0': {
        switch (colourSpace) {
          case 'RGB':
            return row.rgba.r;
          case 'HSV':
            return Math.round(row.hsva.h);
          case 'HSL':
            return Math.round(row.hsla.h);
          default:
            return '-'
        }
      }
      case 'channel1': {
        switch (colourSpace) {
          case 'RGB':
            return row.rgba.g;
          case 'HSV':
            return getFormattedPercent(row.hsva.s);
          case 'HSL':
            return getFormattedPercent(row.hsla.s);
          default:
            return '-'
        }
      }
      case 'channel2': {
        switch (colourSpace) {
          case 'RGB':
            return row.rgba.b;
          case 'HSV':
            return getFormattedPercent(row.hsva.v);
          case 'HSL':
            return getFormattedPercent(row.hsla.l);
          default:
            return '-'
        }
      }
      case 'channel3': {
        switch (colourSpace) {
          case 'RGB':
            return getFormattedPercent(row.rgba.a);
          case 'HSV':
            return getFormattedPercent(row.hsva.a);
          case 'HSL':
            return getFormattedPercent(row.hsla.a);
          default:
            return '-'
        }
      }
    }
  }, [colourSpace]);

  const rowComparator: RowComparator<RowData> = useCallback((a, b, orderBy: string, orderDirection: OrderDirection) => {
    let result = 0;
    switch (orderBy) {
      case 'usage':
        result = numberComparator(a.usage, b.usage);
        break;
      case 'channel0': {
        switch (colourSpace) {
          case 'RGB':
            result = numberComparator(a.rgba.r, b.rgba.r);
            break;
          case 'HSV':
            result = numberComparator(a.hsva.h, b.hsva.h);
            break;
          case 'HSL':
            result = numberComparator(a.hsla.h, b.hsla.h);
            break;
        }
        break;
      }
      case 'channel1': {
        switch (colourSpace) {
          case 'RGB':
            result = numberComparator(a.rgba.g, b.rgba.g);
            break;
          case 'HSV':
            result = numberComparator(a.hsva.s, b.hsva.s);
            break;
          case 'HSL':
            result = numberComparator(a.hsla.s, b.hsla.s);
            break;
        }
        break;
      }
      case 'channel2': {
        switch (colourSpace) {
          case 'RGB':
            result = numberComparator(a.rgba.b, b.rgba.b);
            break;
          case 'HSV':
            result = numberComparator(a.hsva.v, b.hsva.v);
            break;
          case 'HSL':
            result = numberComparator(a.hsla.l, b.hsla.l);
            break;
        }
        break;
      }
      case 'channel3': {
        switch (colourSpace) {
          case 'RGB':
            result = numberComparator(a.rgba.a, b.rgba.a);
            break;
          case 'HSV':
            result = numberComparator(a.hsva.a, b.hsva.a);
            break;
          case 'HSL':
            result = numberComparator(a.hsla.a, b.hsla.a);
            break;
        }
        break;
      }
    }
    return orderDirection === 'asc' ? result : -result;
  }, [colourSpace]);

  const handleColourSpaceChange = useCallback((
    _event: any,
    colourSpaceNew: ColourSpace | null,
  ) => {
    if (colourSpaceNew) {
      storeString('ColoursTable.colourSpace', colourSpaceNew);
      setColourSpace(colourSpaceNew);
    }
  }, [setColourSpace])

  const handleHighlightStyleChange = useCallback((
    _event: any,
    highlightModeNew: string | null,
  ) => {
    if (highlightModeNew) {
      setHighlightMode(highlightModeNew);
    }
  }, [setHighlightMode])

  const onClearHighlights = useCallback(() => {
    dispatchHighlightedColourState({operation: 'reset'});
  }, [dispatchHighlightedColourState]);

  const onRowEnter = useCallback((rowData: RowData) => {
    dispatchHighlightedColourState({operation: 'hoverStart', colourKey: rowData.colourKey});
  }, [dispatchHighlightedColourState]);

  const onRowLeave = useCallback((rowData: RowData) => {
    dispatchHighlightedColourState({operation: 'hoverEnd', colourKey: rowData.colourKey});
  }, [dispatchHighlightedColourState]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
    >
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'row'}
          gap={2}
          p={2}
        >
          <ToggleButtonGroup
            value={colourSpace}
            exclusive
            color="primary"
            onChange={handleColourSpaceChange}
          >
            <ToggleButton value="RGB">
              RGB
            </ToggleButton>
            <ToggleButton value="HSV">
              HSV
            </ToggleButton>
            <ToggleButton value="HSL">
              HSL
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={highlightMode}
            exclusive
            color="primary"
            onChange={handleHighlightStyleChange}
          >
            <ToggleButton value="monotone">
              Monotone
            </ToggleButton>
            <ToggleButton value="inverse">
              Inverse
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant={'outlined'}
            onClick={onClearHighlights}
          >
            Clear Highlights
          </Button>
        </Box>
      </Paper>
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreSharp/>}
          >
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
              {rowBackgroundDataUnsorted.length > 1 ? (
                <VerdictIcon verdict={'error'}/>
              ) : (
                <VerdictIcon verdict={'success'}/>
              )}
              <Typography>Background Colours</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <RichTable
              columns={columns}
              rows={rowBackgroundDataUnsorted}
              defaultOrderBy={'usage'}
              defaultOrderDirection={'desc'}
              rowComparator={rowComparator}
              getHeaderCell={getHeaderCell}
              getCell={getCell}
              onRowEnter={onRowEnter}
              onRowLeave={onRowLeave}
              checkboxesChecked={checkboxesChecked}
              onCheckboxChange={onCheckboxChange}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreSharp/>}
          >
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
              <VerdictIcon verdict={colourReport?.verdict || null}/>
              <Typography>Sprite Colours</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <RichTable
              columns={columns}
              rows={rowNonBackgroundDataUnsorted}
              defaultOrderBy={'usage'}
              defaultOrderDirection={'desc'}
              rowComparator={rowComparator}
              getHeaderCell={getHeaderCell}
              getCell={getCell}
              onRowEnter={onRowEnter}
              onRowLeave={onRowLeave}
              checkboxesChecked={checkboxesChecked}
              onCheckboxChange={onCheckboxChange}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
