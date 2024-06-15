import {styled, TableCell, TableCellProps, TableRow, TableSortLabel} from "@mui/material";
import {Column, HeaderCellBuilder, OrderDirection} from "./types.ts";

const StyledTableCell = styled(TableCell)<TableCellProps>(({theme}) => ({
  backgroundColor: theme.palette.background.paper,
}));

export interface RichTableHeadRowProps {
  columns: Column[];
  orderBy?: string;
  orderDirection?: OrderDirection;
  getHeaderCell?: HeaderCellBuilder;
  onSortChange?: (orderByNew: string, orderDirectionNew: OrderDirection) => void;
}

export function RichTableHeadRow(
  {
    columns,
    orderBy,
    orderDirection,
    getHeaderCell,
    onSortChange,
  }: RichTableHeadRowProps
) {
  const totalRelativeWidth = columns.reduce((acc, curr) => {
    if (curr.relativeWidth) {
      return acc + curr.relativeWidth;
    }
    return acc;
  }, 0);
  return (
    <TableRow>
      {columns.map(
        (column) => {
          const {
            id,
            label,
            sortable,
            align,
            relativeWidth,
          } = column;
          let width: string | undefined;
          if (typeof relativeWidth === 'number') {
            width = `${Math.floor(100 * relativeWidth / totalRelativeWidth)}%`;
          }
          if (sortable) {
            return (
              <StyledTableCell
                key={column.id}
                variant="head"
                align={align}
                width={width}
              >
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? orderDirection : 'asc'}
                  onClick={() => {
                    if (orderBy === id) {
                      onSortChange?.(id, orderDirection === 'asc' ? 'desc' : 'asc');
                    } else {
                      onSortChange?.(id, orderDirection || 'asc');
                    }
                  }}
                >
                  {getHeaderCell ? getHeaderCell(column) : label}
                </TableSortLabel>
              </StyledTableCell>
            );
          }
          return (
            <StyledTableCell
              key={column.id}
              variant="head"
              align={align}
              width={width}
            >
              {getHeaderCell ? getHeaderCell(column) : label}
            </StyledTableCell>
          );
        })
      }
    </TableRow>
  );
}
