import {ReactNode} from "react";


export type OrderDirection = 'asc' | 'desc';

export interface RowDataBase {
  id: string;
}

export interface Column {
  id: string;
  label: string;
  sortable?: boolean;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

export interface RowElementAndMetaData<Data extends RowDataBase> {
  element: ReactNode;
  row: Data;
}

export type RowComparator<Data extends RowDataBase> = (a: Data, b: Data, orderBy: string, orderDirection: OrderDirection) => number;

export type HeaderCellBuilder = (column: Column) => ReactNode;

export type CellBuilder<Data extends RowDataBase> = (row: Data, columnId: string) => ReactNode;

export type RowEnterHandler<Data extends RowDataBase> = (row: Data) => void;

export type RowLeaveHandler<Data extends RowDataBase> = (row: Data) => void;

export type CheckboxChangeHandler<Data extends RowDataBase> = (rowData: Data, isCheckedNew: boolean) => void;
