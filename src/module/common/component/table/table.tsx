import { ReactNode } from 'react';

import { CheckBoxFormik, Pagination } from '@/module/common/component';
import { Iuuid } from '@/module/common/types';

import * as Styled from './table.styled';

export interface ITableProps {
    arrayHeader: {
        text: string;
        data_key: string;
        className?: 'title' | 'id' | 'cell' | 'status' | string;
    }[];
    arrayBody: { [key: string]: string | boolean }[] | any[];
    parseValue?: (value: any, key: string, valueObj: any) => ReactNode | string;
    onNavigate?: (id: Iuuid) => void;
    pagination?: {
        total: number;
        page: number;
        pageSize: number;
        setPage: (page: number) => void;
    };
    select?: {
        items: number[];
        addItems: any;
        allSelect: boolean;
        setAllSelect: any;
    };
    className?: 'scroll' | 'table' | 'full' | 'pointer' | string;
    onLine?: boolean;
    isOpenRowId?: Iuuid | null;
}

export const TableIndex = ({
    arrayHeader,
    arrayBody,
    parseValue,
    pagination,
    onNavigate,
    select,
    onLine = false,
    className,
    isOpenRowId
}: ITableProps) => {
    const hasInArray = (arr: number[], value: number | string): boolean => {
        const items = arr.findIndex((item) => item === +value);

        return items !== -1;
    };

    return (
        <>
            <Styled.Table className={className ?? ''}>
                <Styled.Head>
                    <Styled.Row>
                        {select ? (
                            <Styled.HeadRow className='id'>
                                <CheckBoxFormik
                                    name=''
                                    label=''
                                    noFormikValue={{
                                        value: select?.allSelect,
                                        onSetValue: (_, value) => select?.setAllSelect(value)
                                    }}
                                />
                            </Styled.HeadRow>
                        ) : null}
                        {arrayHeader.map(({ text, className }, i) => (
                            <Styled.HeadRow className={className ?? 'title'} key={i}>
                                {text}
                            </Styled.HeadRow>
                        ))}
                    </Styled.Row>
                </Styled.Head>

                <Styled.Body>
                    {arrayBody.length
                        ? arrayBody.map((value: any, index) => {
                              const isRemoved = value?.status === 'Removed';
                              const id = value?.id;
                              return (
                                  <Styled.Row
                                      key={id ? id : index}
                                      className={`${isRemoved ? 'removed' : ''} ${
                                          isOpenRowId === id ? 'openRowId' : ''
                                      }`}
                                  >
                                      {select ? (
                                          <Styled.Data className='id'>
                                              <CheckBoxFormik
                                                  name=''
                                                  label=''
                                                  noFormikValue={{
                                                      value:
                                                          select?.allSelect ||
                                                          select?.items.some((item) => item === id),
                                                      onSetValue: () => {
                                                          if (select?.allSelect) {
                                                              select?.setAllSelect(false);
                                                              return select?.addItems([id]);
                                                          }

                                                          if (
                                                              !hasInArray(select?.items ?? [], id)
                                                          ) {
                                                              return select?.addItems([
                                                                  ...(select?.items ?? []),
                                                                  id
                                                              ]);
                                                          }

                                                          select?.addItems(
                                                              (select?.items ?? []).filter(
                                                                  (item) => item !== id
                                                              )
                                                          );
                                                      }
                                                  }}
                                              />
                                          </Styled.Data>
                                      ) : null}
                                      {arrayHeader.map((v, i) => {
                                          const _value = parseValue
                                              ? parseValue(value[v.data_key], v.data_key, value)
                                              : value[v.data_key] ?? '';

                                          return (
                                              <Styled.Data
                                                  className={v?.className ?? 'title'}
                                                  key={`td${index}${i}`}
                                                  onClick={onNavigate?.bind(this, value.id)}
                                              >
                                                  {(
                                                      typeof _value === 'boolean'
                                                          ? _value.toString()
                                                          : _value
                                                  ) ? (
                                                      <Styled.ItemLabel
                                                          className={
                                                              onLine ? 'onLine tooltip' : 'tooltip'
                                                          }
                                                          linesToTruncate={1}
                                                          tooltipText={
                                                              typeof _value === 'string'
                                                                  ? _value
                                                                  : ''
                                                          }
                                                      >
                                                          {typeof _value === 'boolean'
                                                              ? _value.toString()
                                                              : _value ?? ''}
                                                      </Styled.ItemLabel>
                                                  ) : null}
                                              </Styled.Data>
                                          );
                                      })}
                                  </Styled.Row>
                              );
                          })
                        : null}
                </Styled.Body>
            </Styled.Table>
            {pagination && pagination.total > pagination.pageSize && (
                <Styled.WrapperPagination>
                    <Pagination
                        onPageChange={(page) => {
                            pagination?.setPage(page);
                        }}
                        currentPage={pagination?.page}
                        totalCount={pagination.total}
                        pageSize={pagination.pageSize}
                    />
                </Styled.WrapperPagination>
            )}
        </>
    );
};

export const Table = (props: ITableProps) => {
    return props.className === 'scroll' ? (
        <Styled.Container className={props.className ?? ''}>
            <TableIndex {...props} />
        </Styled.Container>
    ) : (
        <Styled.Wrapper id='tableContainer'>
            <TableIndex {...props} />
        </Styled.Wrapper>
    );
};
