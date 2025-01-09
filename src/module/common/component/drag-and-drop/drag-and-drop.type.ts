import { DragEvent } from 'react';

export type Obj = Record<string, unknown>;
export type Item = Obj;

interface IColumnsProps<
  C extends Item,
  R extends Item
> {
  columns: C[];
  rows: R[];
  columnBinding: C extends Obj ? keyof C : string;
  rowBinding: R extends Obj ? keyof R : string;
  rowToColumnBinding: R extends Obj ? keyof R : string;
  title: R extends Obj ? keyof R : string;
  settings?: Record<string, any>;
  setState: ({ columns, rows }: { columns: C[], rows: R[] }) => void;
}

interface IRowsProps<
  R extends Item
> {
  rows: R[];
  rowBinding: R extends Obj ? keyof R : string;
  title: R extends Obj ? keyof R : string;
  settings?: Record<string, any>;
  setState: ({ rows }: { rows: R[] }) => void;
}

export type DragAndDropProps<
  I extends Item,
  R extends Item
> =
  | { type: 'columns'; props: IColumnsProps<I, R> }
  | { type: 'rows'; props: IRowsProps<R> };

type SetStateMany<C extends Item, R extends Item> = {
  setState: ({ columns, rows }: { columns: C[], rows: R[] }) => void;
  type: 'many';
};

type SetStateSingle<R extends Item> = {
  setState: ({ rows }: { rows: R[] }) => void;
  type: 'single';
};
interface IBaseColumnComponentProps<C extends Item, R extends Item> {
  index: number;
  column: C;
  rows: R[];
  columnBinding: C extends Obj ? keyof C : string;
  rowBinding: R extends Obj ? keyof R : string;
  rowToColumnBinding: R extends Obj ? keyof R : string;
  title: R extends Obj ? keyof R : string;
  columns: C[];
}

export type IColumnComponentProps<C extends Item, R extends Item> =
  (IBaseColumnComponentProps<C, R> & SetStateMany<C, R>) |
  (IBaseColumnComponentProps<C, R> & SetStateSingle<R>);


export interface IRowProps<R extends Item> {
  row: R;
  onDragStart: (e: DragEvent<HTMLDivElement>, row: R) => void;
  dataBefore: string;
  dataColumn: string;
  title: string;
}
