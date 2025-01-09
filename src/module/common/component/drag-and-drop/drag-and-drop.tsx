import { useState, DragEvent } from 'react';

import * as Styled from './drag-and-drop.styled.ts';
import { DragAndDropProps, IColumnComponentProps, IRowProps, Item } from './drag-and-drop.type.ts';


export const DragAndDrop = <
  C extends Item,
  R extends Item
>({
    type,
    props
  }: DragAndDropProps<C, R>) => {

  if (type === 'columns' && props.columns.length) {
    return (
      <Styled.Container>
        {props.columns.map((column, index) => {
          return (
            <Column
              key={index}
              index={index}
              column={column}
              type="many"
              {...props}
            />
          );
        })}
      </Styled.Container>
    );
  }
  if (type === 'rows' && props.rows.length) {
    const column = { title: 'test', id: 1 };
    return (
      <Styled.Container>
        <Column
          index={0}
          type="single"
          {...props}
          columns={[column]}
          column={column}
          rowToColumnBinding={'id' as any}
          columnBinding="id"

        />
      </Styled.Container>
    );
  }
};


export const Column = <C extends Item, R extends Item>({
                                                         column,
                                                         index,
                                                         rows,
                                                         setState,
                                                         columns,
                                                         rowBinding,
                                                         rowToColumnBinding,
                                                         title,
                                                         columnBinding,
                                                         type
                                                       }: IColumnComponentProps<C, R>) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: R) => {
    e.dataTransfer.setData('cardId', String(card[rowBinding]));
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData('cardId');

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || '-1';

    if (before !== cardId) {
      let copy = [...rows];

      let cardToTransfer = copy.find((c) => String(c[rowBinding]) === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column_id: column.id };

      copy = copy.filter((c) => String(c[rowBinding]) !== cardId);

      const moveToBack = before === '-1';

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => String(el[rowBinding]) === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      if (type === 'many') {
        setState({ columns, rows: copy });
        return;
      }
      setState({ rows: copy });


    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = '0';
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = '1';
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1]
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column[columnBinding]}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };


  const filteredRows = type === 'many' ? rows.filter((c) => {
    return String(c[rowToColumnBinding]) === String(column[columnBinding]);
  }) : rows;

  return (
    <Styled.Column
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      $active={active}
    >
      {filteredRows.map((row, ind) => (
        <Row key={`${index}_${ind}`}
             row={{ ...row, column_id: type === 'many' ? row.column_id : column.id }}
             onDragStart={handleDragStart}
             dataColumn={String((type === 'many' ? row[rowToColumnBinding] : column[columnBinding]))}
             dataBefore={String(row[rowBinding])}
             title={String(row[title])}
        />
      ))}
      <Styled.DropIndicator data-before="-1" data-column={String(column[columnBinding])} />

    </Styled.Column>
  );
};


export const Row = <R extends Item>({ row, onDragStart, dataBefore, dataColumn, title }: IRowProps<R>) => {
  return (
    <>
      <Styled.DropIndicator data-before={dataBefore} data-column={dataColumn} />
      <Styled.Row
        draggable="true"
        onDragStart={(e) => {
          const dragEvent = e as any;
          onDragStart(dragEvent, row);
        }}
      >
        {title}
      </Styled.Row>
    </>
  );
};
