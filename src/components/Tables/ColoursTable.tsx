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
import {ColorObject, HSL, HSV, to as convert} from "colorjs.io/fn";
import {MouseEvent, useCallback, useContext, useMemo, useState} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {getFormattedPercent} from "../../utils/getFormattedPercent.ts";
import {getHex6FromColourKey} from "../../utils/image/conversion/getHex6FromColourKey.ts";
import {getHex8FromColourKey} from "../../utils/image/conversion/getHex8FromColourKey.ts";
import {getPixelFromColourKey} from "../../utils/image/conversion/getPixelFromColourKey.ts";
import {retrieveTyped} from "../../utils/localStorage/retrieveTyped.ts";
import {storeString} from "../../utils/localStorage/storeString.ts";
import {numberComparator} from "../../utils/numberComparator.ts";
import {ColourSwatch} from "../ColourSwatch.tsx";
import {VerdictIcon} from "../VerdictIcon.tsx";
import {LongRichTable} from "./RichTable/LongRichTable.tsx";
import {RichTable} from "./RichTable/RichTable.tsx";
import {Column, OrderDirection, RowComparator, RowDataBase} from "./RichTable/types.ts";

type ColourSpace = 'RGB' | 'HSV' | 'HSL';

const checkboxRelativeWidth = 2;

const columns: Column[] = [
  {
    id: 'colour',
    label: 'Colour',
    relativeWidth: 5,
  },
  {
    id: 'usage',
    label: 'Usage',
    sortable: true,
    align: 'right',
    relativeWidth: 4,
  },
  {
    id: 'channel0',
    label: 'Channel 0',
    sortable: true,
    align: 'right',
    relativeWidth: 3,
  },
  {
    id: 'channel1',
    label: 'Channel 1',
    sortable: true,
    align: 'right',
    relativeWidth: 3,
  },
  {
    id: 'channel2',
    label: 'Channel 2',
    sortable: true,
    align: 'right',
    relativeWidth: 3,
  },
  {
    id: 'channel3',
    label: 'Channel 3',
    sortable: true,
    align: 'right',
    relativeWidth: 3,
  },
];

interface RowData extends RowDataBase {
  colour: ColorObject;
  colourKey: number;
  rgba: { r: number, g: number, b: number, a: number };
  hsva: ColorObject;
  hsla: ColorObject;
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
      if (curr.colour.alpha === 0) {
        return acc + curr.count;
      }
      return acc;
    }, 0);
    const nonBackgroundPixelCountNew = colourReport ? colourReport.analysis.pixelCount - backgroundPixelCountNew : 1;

    const rowBackgroundDataUnsortedNew: RowData[] = [];
    const rowNonBackgroundDataUnsortedNew: RowData[] = [];
    colourReport?.analysis.getAsArray().forEach(({colour, colourKey, count}) => {
      const [r, g, b, a] = getPixelFromColourKey(colourKey);
      const rgba = {r, g, b, a};
      const hsva = convert(colour, HSV);
      const hsla = convert(colour, HSL);
      const isBackground = colour.alpha === 0;
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
  }, [highlightedColourState]);

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
            <ColourSwatch colour={`#${getHex8FromColourKey(row.colourKey)}`}/>
            <Typography fontFamily={'monospace'}>
              {getHex6FromColourKey(row.colourKey).toUpperCase()}
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
            return Math.round(row.hsva.coords[0] || 0);
          case 'HSL':
            return Math.round(row.hsla.coords[0] || 0);
          default:
            return '-'
        }
      }
      case 'channel1': {
        switch (colourSpace) {
          case 'RGB':
            return row.rgba.g;
          case 'HSV':
            return getFormattedPercent(row.hsva.coords[1] / 100);
          case 'HSL':
            return getFormattedPercent(row.hsla.coords[1] / 100);
          default:
            return '-'
        }
      }
      case 'channel2': {
        switch (colourSpace) {
          case 'RGB':
            return row.rgba.b;
          case 'HSV':
            return getFormattedPercent(row.hsva.coords[2] / 100);
          case 'HSL':
            return getFormattedPercent(row.hsla.coords[2] / 100);
          default:
            return '-'
        }
      }
      case 'channel3': {
        switch (colourSpace) {
          case 'RGB':
            return getFormattedPercent(row.rgba.a / 255);
          case 'HSV':
            return getFormattedPercent(row.hsva.alpha);
          case 'HSL':
            return getFormattedPercent(row.hsla.alpha);
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
            result = numberComparator(a.hsva.coords[0] || 0, b.hsva.coords[0] || 0);
            break;
          case 'HSL':
            result = numberComparator(a.hsla.coords[0] || 0, b.hsla.coords[0] || 0);
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
            result = numberComparator(a.hsva.coords[1] || 0, b.hsva.coords[1] || 0);
            break;
          case 'HSL':
            result = numberComparator(a.hsla.coords[1] || 0, b.hsla.coords[1] || 0);
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
            result = numberComparator(a.hsva.coords[2] || 0, b.hsva.coords[2] || 0);
            break;
          case 'HSL':
            result = numberComparator(a.hsla.coords[2] || 0, b.hsla.coords[2] || 0);
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
            result = numberComparator(a.hsva.alpha, b.hsva.alpha);
            break;
          case 'HSL':
            result = numberComparator(a.hsla.alpha, b.hsla.alpha);
            break;
        }
        break;
      }
    }
    return orderDirection === 'asc' ? result : -result;
  }, [colourSpace]);

  const handleColourSpaceChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    colourSpaceNew: ColourSpace | null,
  ) => {
    if (colourSpaceNew) {
      storeString('ColoursTable.colourSpace', colourSpaceNew);
      setColourSpace(colourSpaceNew);
    }
  }, [setColourSpace])

  const handleHighlightStyleChange = useCallback((
    _event: MouseEvent<HTMLElement>,
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
            <ToggleButton value="negative">
              Negative
            </ToggleButton>
            <ToggleButton value="rotate">
              Rotate
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
              {rowBackgroundDataUnsorted.length == 0 && (<VerdictIcon verdict={null}/>)}
              {rowBackgroundDataUnsorted.length == 1 && (<VerdictIcon verdict={'success'}/>)}
              {rowBackgroundDataUnsorted.length > 1 && (<VerdictIcon verdict={'error'}/>)}
              <Typography>Background Colours</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {rowBackgroundDataUnsorted.length > 32 ? (
              <LongRichTable
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
                checkboxRelativeWidth={checkboxRelativeWidth}
              />
            ) : (
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
                checkboxRelativeWidth={checkboxRelativeWidth}
              />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreSharp/>}
          >
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
              <VerdictIcon verdict={colourReport?.analysis.getColourCountVerdict() || null}/>
              <Typography>Sprite Colours</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {rowNonBackgroundDataUnsorted.length > 32 ? (
              <LongRichTable
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
                checkboxRelativeWidth={checkboxRelativeWidth}
              />
            ) : (
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
                checkboxRelativeWidth={checkboxRelativeWidth}
              />
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
