import {Table, TableBody, TableContainer, TableHead} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {RichTableHeadRow} from "./RichTableHeadRow.tsx";
import {RichTableRow} from "./RichTableRow.tsx";
import {OrderDirection, RichTableProps, RowDataBase} from "./types.ts";

export function RichTable<Data extends RowDataBase>(
  {
    columns,
    rows,
    defaultOrderBy,
    defaultOrderDirection,
    rowComparator,
    getHeaderCell,
    getCell,
    onRowEnter,
    onRowLeave,
    checkboxesChecked,
    onCheckboxChange,
    checkboxRelativeWidth,
    minWidth,
  }: RichTableProps<Data>,
) {
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(defaultOrderDirection);

  const onSortChange = useCallback((orderByNew: string, orderDirectionNew: OrderDirection) => {
    setOrderBy(orderByNew);
    setOrderDirection(orderDirectionNew)
  }, [setOrderBy, setOrderDirection]);

  const columnsProcessed = useMemo(() => {
    if (onCheckboxChange) {
      return [{id: 'checkboxes', label: '', relativeWidth: checkboxRelativeWidth}, ...columns];
    }
    return columns;
  }, [columns, onCheckboxChange, checkboxRelativeWidth]);

  const rowElementsAndMetaData = useMemo(() => {
    return rows.map((row) => {
      const element = (
        <RichTableRow
          key={row.id}
          columns={columnsProcessed}
          row={row}
          onRowEnter={onRowEnter}
          onRowLeave={onRowLeave}
          getCell={getCell}
          checkboxChecked={checkboxesChecked?.[row.id] || false}
          onCheckboxChange={onCheckboxChange}
        />
      );
      return {
        row,
        element,
      }
    });
  }, [columnsProcessed, rows, onRowEnter, onRowLeave, getCell, checkboxesChecked, onCheckboxChange]);

  const sortedRowElements = useMemo(() => {
    return rowElementsAndMetaData
      .sort((a, b) => {
        return rowComparator?.(a.row, b.row, orderBy, orderDirection) || 0;
      })
      .map(({element}) => {
        return element;
      });
  }, [rowElementsAndMetaData, rowComparator, orderBy, orderDirection]);

  return (
    <TableContainer>
      <Table
        size="small"
        sx={{borderCollapse: 'separate', tableLayout: 'fixed', minWidth}}
      >
        <TableHead>
          <RichTableHeadRow
            columns={columnsProcessed}
            orderBy={orderBy}
            orderDirection={orderDirection}
            getHeaderCell={getHeaderCell}
            onSortChange={onSortChange}
          />
        </TableHead>
        <TableBody>
          {...sortedRowElements}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
