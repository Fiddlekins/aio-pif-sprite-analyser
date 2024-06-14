import {Checkbox, styled, TableCell, TableRow, TableRowProps} from "@mui/material";
import {useCallback, useMemo} from "react";
import {CellBuilder, CheckboxChangeHandler, Column, RowDataBase, RowEnterHandler, RowLeaveHandler} from "./types.ts";

const StyledTableRow = styled(TableRow)<TableRowProps>(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export interface RichTableRowProps<Data extends RowDataBase> {
  columns: Column[];
  row: Data;
  onRowEnter?: RowEnterHandler<Data>;
  onRowLeave?: RowLeaveHandler<Data>;
  getCell: CellBuilder<Data>;
  checkboxChecked: boolean;
  onCheckboxChange?: CheckboxChangeHandler<Data>;
}

export function RichTableRow<Data extends RowDataBase>(
  {
    columns,
    row,
    onRowEnter,
    onRowLeave,
    getCell,
    checkboxChecked,
    onCheckboxChange,
  }: RichTableRowProps<Data>
) {
  let checkboxColumn: Column | null = null;
  let nonCheckboxColumns: Column[];
  if (onCheckboxChange) {
    [checkboxColumn, ...nonCheckboxColumns] = columns;
  } else {
    nonCheckboxColumns = columns;
  }

  const checkboxCellElement = useMemo(() => {
    if (checkboxColumn) {
      return (
        <TableCell
          key={checkboxColumn.id}
          align={checkboxColumn.align}
        >
          <Checkbox
            checked={checkboxChecked}
            onChange={(e) => {
              onCheckboxChange?.(row, e.target.checked);
            }}
            sx={{padding: 0}}
          />
        </TableCell>
      );
    }
    return null;
  }, [checkboxColumn, row, onCheckboxChange, checkboxChecked]);

  const nonCheckboxCellElements = useMemo(() => {
    return nonCheckboxColumns.map((column) => {
      return (
        <TableCell
          key={column.id}
          align={column.align}
        >
          {getCell(row, column.id)}
        </TableCell>
      );
    })
  }, [nonCheckboxColumns, row, getCell]);

  const onMouseEnter = useCallback(() => {
    onRowEnter?.(row);
  }, [onRowEnter, row]);

  const onMouseLeave = useCallback(() => {
    onRowLeave?.(row);
  }, [onRowLeave, row]);

  return (
    <StyledTableRow
      key={row.id}
      onMouseEnter={onRowEnter && onMouseEnter}
      onMouseLeave={onRowLeave && onMouseLeave}
    >
      {checkboxCellElement}
      {...nonCheckboxCellElements}
    </StyledTableRow>
  );
}
