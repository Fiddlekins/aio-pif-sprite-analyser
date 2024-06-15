import {Checkbox, TableCell} from "@mui/material";
import {Fragment, useMemo} from "react";
import {CellBuilder, CheckboxChangeHandler, Column, RowDataBase, RowEnterHandler, RowLeaveHandler} from "./types.ts";

export interface RichTableRowContentProps<Data extends RowDataBase> {
  columns: Column[];
  row: Data;
  onRowEnter?: RowEnterHandler<Data>;
  onRowLeave?: RowLeaveHandler<Data>;
  getCell: CellBuilder<Data>;
  checkboxChecked: boolean;
  onCheckboxChange?: CheckboxChangeHandler<Data>;
}

export function RichTableRowContent<Data extends RowDataBase>(
  {
    columns,
    row,
    onRowEnter,
    onRowLeave,
    getCell,
    checkboxChecked,
    onCheckboxChange,
  }: RichTableRowContentProps<Data>
) {
  let checkboxColumn: Column | null = null;
  let nonCheckboxColumns: Column[];
  if (onCheckboxChange) {
    [checkboxColumn, ...nonCheckboxColumns] = columns;
  } else {
    nonCheckboxColumns = columns;
  }

  const onMouseEnter = useMemo(() => {
    if (onRowEnter) {
      return () => {
        onRowEnter(row);
      }
    }
    return undefined;
  }, [onRowEnter, row]);

  const onMouseLeave = useMemo(() => {
    if (onRowLeave) {
      return () => {
        onRowLeave(row);
      }
    }
    return undefined;
  }, [onRowLeave, row]);

  const checkboxCellElement = useMemo(() => {
    if (checkboxColumn) {
      return (
        <TableCell
          key={checkboxColumn.id}
          align={checkboxColumn.align}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
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
  }, [checkboxColumn, row, onCheckboxChange, checkboxChecked, onMouseEnter, onMouseLeave]);

  const nonCheckboxCellElements = useMemo(() => {
    return nonCheckboxColumns.map((column) => {
      return (
        <TableCell
          key={column.id}
          align={column.align}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {getCell(row, column.id)}
        </TableCell>
      );
    })
  }, [nonCheckboxColumns, row, getCell, onMouseEnter, onMouseLeave]);

  return (
    <Fragment
      key={row.id}
    >
      {checkboxCellElement}
      {...nonCheckboxCellElements}
    </Fragment>
  );
}
