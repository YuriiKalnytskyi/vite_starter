import {CheckBox, Pagination} from '@/module/common/component';
import {Iuuid} from '@/module/common/types';

import * as Styled from './table.styled';
import {useRef, useState} from "react";
import {usePortalPositioning} from "@/module/common/hooks";

export interface ITableProps {
    arrayHeader: {
        text: string;
        data_key: string;
        className?: 'title' | 'id' | string;
    }[];
    arrayBody: { [key: string]: string | boolean }[] | any[];
    parseValue?: (value: unknown, key: string, valueObj: Record<string, unknown>) => unknown;
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
    isOpenRowId?: Iuuid | null;
    tooltipLength?: number;
    linesToTruncate?: number;
}

export const TableIndex = ({
                               arrayHeader,
                               arrayBody,
                               parseValue,
                               onNavigate,
                               select,
                               className,
                               isOpenRowId,
                               tooltipLength,
                               linesToTruncate
                           }: ITableProps) => {
    const hasInArray = (arr: number[], value: number | string): boolean => {
        const items = arr.findIndex((item) => item === +value);

        return items !== -1;
    };

    const inputHintBlockRef = useRef<HTMLDivElement | null>(null);
    const [focused, setFocused] = useState<string | null>(null);


    const {setting, Component} = usePortalPositioning(inputHintBlockRef, !!focused);
    console.log(focused)


    return (
        <Styled.Table className={className ?? ''}>
            <Styled.Head>
                <Styled.Row>
                    {select ? (
                        <Styled.HeadRow className="id">
                            <CheckBox
                                name="selet"
                                type="default"
                                items=""
                                noFormikValue={{
                                    value: select?.allSelect,
                                    onSetValue: (_, value) => select?.setAllSelect(value)
                                }}
                            />
                        </Styled.HeadRow>
                    ) : null}
                    {arrayHeader.map(({text, className}, i) => (
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
                                    <Styled.Data className="id">
                                        <CheckBox
                                            name="selet"
                                            type="default"
                                            items=""
                                            noFormikValue={{
                                                value: select?.allSelect || select?.items.some((item) => item === id),
                                                onSetValue: () => {
                                                    if (select?.allSelect) {
                                                        select?.setAllSelect(false);
                                                        return select?.addItems([id]);
                                                    }

                                                    if (!hasInArray(select?.items ?? [], id)) {
                                                        return select?.addItems([...(select?.items ?? []), id]);
                                                    }

                                                    select?.addItems((select?.items ?? []).filter((item) => item !== id));
                                                }
                                            }}
                                        />
                                    </Styled.Data>
                                ) : null}
                                {arrayHeader.map((v, i) => {
                                    const _value = parseValue
                                        ? parseValue(value[v.data_key], v.data_key, value)
                                        : value[v.data_key] ?? '';
                                    const key = `td${index}${i}`;
                                    const content = typeof _value === 'boolean' ? _value.toString() : _value ?? '';
                                    return (
                                        <Styled.Data
                                            className={v?.className ?? 'title'}
                                            key={key}
                                            onClick={onNavigate?.bind(this, value.id)}
                                        >
                                            {(typeof _value === 'boolean' ? _value.toString() : _value) ? (
                                                <Styled.ItemLabel
                                                    $tooltipLength={tooltipLength}
                                                    $linesToTruncate={linesToTruncate ?? 3}
                                                    $lastIndexHorizontal={i === arrayHeader.length - 1}
                                                    $firstIndexVertical={index >= arrayBody.length - 2}
                                                    $tooltipText={content}
                                                    ref={inputHintBlockRef}
                                                    onMouseEnter={() => setFocused(key)}
                                                    onMouseOut={() => setFocused(null)}
                                                >
                                                    {content}
                                                    {/*<div className="tooltipHover"*/}
                                                    {focused === key && content.length >(tooltipLength ?? 16) && (
                                                        <Component>
                                                            <Styled.SuggestedBlock
                                                                id="SuggestedBlock"
                                                                height={'5.5rem'}
                                                                style={{
                                                                    ...setting
                                                                }}
                                                                $focus={!!focused}
                                                            >
                                                                {content}
                                                            </Styled.SuggestedBlock>
                                                        </Component>

                                                    )}
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
    );
};

export const Table = (props: ITableProps) => {

    const ContainerWrapper = props.className === 'scroll' ? Styled.Container : Styled.Wrapper;

    return (
        <>
            <ContainerWrapper
                className={props.className ?? ''}
                id={props.className !== 'scroll' ? 'tableContainer' : undefined}
            >
                <TableIndex {...props} />
            </ContainerWrapper>
            {
                props.pagination &&
                props.pagination.total > props.pagination.pageSize && (
                    <Styled.WrapperPagination>
                        <Pagination
                            onPageChange={(page) => {
                                props.pagination?.setPage(page);
                            }}
                            currentPage={props.pagination?.page}
                            totalCount={props.pagination.total}
                            pageSize={props.pagination.pageSize}
                        />
                    </Styled.WrapperPagination>
                )
            }
        </>
    );
};
