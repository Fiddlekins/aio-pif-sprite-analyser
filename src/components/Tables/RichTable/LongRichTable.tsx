import {Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {forwardRef, useCallback, useMemo, useState} from "react";
import {TableComponents, TableVirtuoso} from "react-virtuoso";
import {RichTableHeadRow} from "./RichTableHeadRow.tsx";
import {RichTableRowContent} from "./RichTableRowContent.tsx";
import {OrderDirection, RichTableProps, RowDataBase} from "./types.ts";

export interface LongRichTableProps<Data extends RowDataBase> extends RichTableProps<Data> {
}

export function LongRichTable<Data extends RowDataBase>(
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
  }: LongRichTableProps<Data>,
) {
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(defaultOrderDirection);

  const VirtuosoTableComponents: TableComponents<Data> = useMemo(() => {
    return {
      Scroller: forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer {...props} ref={ref}/>
      )),
      Table: (props) => (
        <Table size="small" {...props} sx={{borderCollapse: 'separate', tableLayout: 'fixed', minWidth}}/>
      ),
      TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableHead {...props} ref={ref}/>
      )),
      TableRow: ({item: _item, ...props}) => <TableRow {...props} />,
      TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref}/>
      )),
    };
  }, [minWidth]);

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

  const fixedHeaderContent = useCallback(() => {
    return (
      <RichTableHeadRow
        columns={columnsProcessed}
        orderBy={orderBy}
        orderDirection={orderDirection}
        getHeaderCell={getHeaderCell}
        onSortChange={onSortChange}
      />
    );
  }, [
    columnsProcessed,
    orderBy,
    orderDirection,
    getHeaderCell,
    onSortChange,
  ]);

  const rowContent = useCallback((_index: number, row: Data) => {
    return (
      <RichTableRowContent
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
  }, [columnsProcessed, onRowEnter, onRowLeave, getCell, checkboxesChecked, onCheckboxChange])

  const sortedRows = useMemo(() => {
    return rows
      .sort((a, b) => {
        return rowComparator?.(a, b, orderBy, orderDirection) || 0;
      });
  }, [rows, rowComparator, orderBy, orderDirection]);

  return (
    <TableVirtuoso
      data={sortedRows}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
      style={{height: 400, tableLayout: 'auto'}}
    />
  );
}
