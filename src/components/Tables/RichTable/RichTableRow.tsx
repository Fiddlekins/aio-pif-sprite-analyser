import {styled, TableRow, TableRowProps} from "@mui/material";
import {useMemo} from "react";
import {RichTableRowContent} from "./RichTableRowContent.tsx";
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

  return (
    <StyledTableRow
      key={row.id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <RichTableRowContent
        columns={columns}
        row={row}
        getCell={getCell}
        checkboxChecked={checkboxChecked}
        onCheckboxChange={onCheckboxChange}
      />
    </StyledTableRow>
  );
}
