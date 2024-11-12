import {observer} from "@legendapp/state/react";
import {Box, Typography} from "@mui/material";
import {ColorObject} from "colorjs.io/fn";
import {useCallback} from "react";
import {ui$, uiSettings$} from "../../state/ui.ts";
import {getFormattedPercent} from "../../utils/getFormattedPercent.ts";
import {getHex6FromColourKey} from "../../utils/image/conversion/getHex6FromColourKey.ts";
import {getHex8FromColourKey} from "../../utils/image/conversion/getHex8FromColourKey.ts";
import {numberComparator} from "../../utils/numberComparator.ts";
import {ColourSwatch} from "../ColourSwatch.tsx";
import {LongRichTable} from "./RichTable/LongRichTable.tsx";
import {RichTable} from "./RichTable/RichTable.tsx";
import {Column, OrderDirection, RowComparator, RowDataBase} from "./RichTable/types.ts";

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

function getHeaderName(colourSpace: string, channel: number) {
  switch (colourSpace) {
    case 'RGB':
      return ['R', 'G', 'B', 'A'][channel];
    case 'HSV':
      return ['H', 'S', 'V', 'A'][channel];
    case 'HSL':
      return ['H', 'S', 'L', 'A'][channel];
  }
}

export interface ColoursTableProps {
  rowDataUnsorted: RowData[];
}

export const ColoursTable = observer(function ColoursTable(
  {
    rowDataUnsorted,
  }: ColoursTableProps
) {
  const isMobile = ui$.isMobile.get();
  const currentCheckedColours = ui$.highlight.currentCheckedColours.get();
  const colourSpace = uiSettings$.colourSpace.get();

  const onCheckboxChange = useCallback(({colourKey}: RowData, isCheckedNew: boolean) => {
    if (isCheckedNew) {
      ui$.highlight.addCheckedColourToCurrent(colourKey);
    } else {
      ui$.highlight.removeCheckedColourFromCurrent(colourKey);
    }
  }, []);

  // const checkboxesChecked = useMemo(() => {
  //   const checkboxesCheckedNew: Record<string, boolean> = {};
  //   currentCheckedColours.forEach((colourKey) => {
  //     checkboxesCheckedNew[colourKey] = true;
  //   })
  //   return checkboxesCheckedNew;
  // }, [currentCheckedColours]);

  const checkboxesChecked: Record<string, boolean> = {};
  currentCheckedColours.forEach((colourKey) => {
    checkboxesChecked[colourKey] = true;
  });

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

  const onRowEnter = useCallback((rowData: RowData) => {
    if (!isMobile) {
      ui$.highlight.addHoveredColourToCurrent(rowData.colourKey);
    }
  }, [isMobile]);

  const onRowLeave = useCallback((rowData: RowData) => {
    if (!isMobile) {
      ui$.highlight.removeHoveredColourFromCurrent(rowData.colourKey);
    }
  }, [isMobile]);

  if (rowDataUnsorted.length > 32) {
    return (
      <LongRichTable
        columns={columns}
        rows={rowDataUnsorted}
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
        minWidth={500}
      />
    )
  }
  return (
    <RichTable
      columns={columns}
      rows={rowDataUnsorted}
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
      minWidth={500}
    />
  );
});
