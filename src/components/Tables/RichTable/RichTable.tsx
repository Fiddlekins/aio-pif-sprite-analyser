import {Table, TableBody, TableContainer} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {RichTableHead} from "./RichTableHead.tsx";
import {RichTableRow} from "./RichTableRow.tsx";
import {
  CellBuilder,
  CheckboxChangeHandler,
  Column,
  HeaderCellBuilder,
  OrderDirection,
  RowComparator,
  RowDataBase,
  RowEnterHandler,
  RowLeaveHandler
} from "./types.ts";

export interface RichTableProps<Data extends RowDataBase> {
  columns: Column[];
  rows: Data[];
  defaultOrderBy: string;
  defaultOrderDirection: OrderDirection;
  rowComparator?: RowComparator<Data>;
  getHeaderCell?: HeaderCellBuilder;
  getCell: CellBuilder<Data>;
  onRowEnter?: RowEnterHandler<Data>;
  onRowLeave?: RowLeaveHandler<Data>;
  checkboxesChecked?: Record<string, boolean>;
  onCheckboxChange?: CheckboxChangeHandler<Data>;
}

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
      return [{id: 'checkboxes', label: ''}, ...columns];
    }
    return columns;
  }, [columns, onCheckboxChange]);

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
      >
        <RichTableHead
          columns={columnsProcessed}
          orderBy={orderBy}
          orderDirection={orderDirection}
          getHeaderCell={getHeaderCell}
          onSortChange={onSortChange}
        />
        <TableBody>
          {...sortedRowElements}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
