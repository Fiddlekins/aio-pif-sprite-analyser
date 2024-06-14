import {TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {Column, HeaderCellBuilder, OrderDirection} from "./types.ts";

export interface RichTableHeadProps {
  columns: Column[];
  orderBy?: string;
  orderDirection?: OrderDirection;
  getHeaderCell?: HeaderCellBuilder;
  onSortChange?: (orderByNew: string, orderDirectionNew: OrderDirection) => void;
}

export function RichTableHead(
  {
    columns,
    orderBy,
    orderDirection,
    getHeaderCell,
    onSortChange,
  }: RichTableHeadProps
) {
  return (
    <TableHead>
      <TableRow>
        {columns.map(
          (column) => {
            const {
              id,
              label,
              sortable,
              align
            } = column;
            if (sortable) {
              return (
                <TableCell
                  key={column.id}
                  align={align}
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
                </TableCell>
              );
            }
            return (
              <TableCell
                key={column.id}
                align={align}
              >
                {getHeaderCell ? getHeaderCell(column) : label}
              </TableCell>
            );
          })
        }
      </TableRow>
    </TableHead>
  );
}
