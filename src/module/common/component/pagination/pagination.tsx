import arrowLeft from '@/assets/icons/default/arrow-left.svg';
import arrowRight from '@/assets/icons/default/arrow-right.svg';
import {useClickOutside, useIsMobile, usePagination} from '@/module/common/hooks';
import {IconCommon} from '@/module/common/styles';
import {IPaginationProps} from '@/module/common/types';

import * as Styled from './pagination.styled';
import { RefObject, useEffect, useState } from 'react';
import {Input} from "@/module/common/component";
import { useDebounce } from 'use-debounce';

export const Pagination = ({
                               currentPage,
                               onPageChange,
                               pageSize,
                               totalCount,
                               siblingCount
                           }: IPaginationProps) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    const lastPage = paginationRange[paginationRange.length - 1];
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === lastPage;
    const [isVisibleInput, setIsVisibleInput] = useState<number | null>(null);
    const [inputPage, setInputPage] = useState<number | null>(null);
    const [valuesDebounce] = useDebounce(inputPage, 1000);

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        if (isFirstPage) return;

        onPageChange(currentPage - 1);
    };

    const onCertainPage = (pageNumber: number) => {
        if (!currentPage) return;

        onPageChange(pageNumber);
    };

    const onSetIsVisibleInput = (flag: number | null) => {
        setIsVisibleInput(flag);
    };

    useEffect(() => {
        if (valuesDebounce && valuesDebounce > 1 && valuesDebounce && +valuesDebounce < +lastPage ){
            onCertainPage(valuesDebounce);
            onReset();

        }
    }, [valuesDebounce]);

    const { ref } = useClickOutside(() => {
        onClickOutside();
    });

    const onClickOutside = () => {
        if (inputPage && inputPage <= +lastPage) {
            onPageChange(inputPage);
        }
        onReset();
    };

    const onReset = () => {
        setIsVisibleInput(null);
        setInputPage(null);
    };

    const mobilePaginationRange = [
        ...(currentPage === 1 ? [] : [1, '...']),
        currentPage,
        ...(currentPage !== lastPage ? ['...', lastPage] : [])
    ];

    const isMobile = useIsMobile();

    const pagination = isMobile ? mobilePaginationRange : paginationRange;
    return (
        <Styled.Container id='Pagination'>
            <Styled.PrevPageButton onClick={onPrevious} disabled={isFirstPage} className='prev'>
                <IconCommon height='0.75rem' icon={arrowLeft} className='icon' cursor='pointer'/>
            </Styled.PrevPageButton>
            <Styled.PaginateButtonsList>
                {pagination.map((pageNumber, index) => {
                    if (typeof pageNumber === 'string') {
                        return index === isVisibleInput ? (
                                <Input
                                    refProps={ref as RefObject<HTMLInputElement>}
                                    key={index}
                                    name='input-page'
                                    width='2rem'
                                    isAutoFocus
                                    type='number'
                                    noFormikValue={{
                                        value: (inputPage && inputPage <= 0 || inputPage && +inputPage > +lastPage ) ? '' : inputPage?.toString() ?? '',
                                        setFieldValue: (_,value) =>setInputPage(+value)
                                    }}
                                />
                            ) :
                            (
                                <Styled.PaginateButtonsListItem
                                    key={index}
                                    onMouseEnter={() => onSetIsVisibleInput(index)}
                                    onMouseLeave={() => onSetIsVisibleInput(null)}
                                >&#8230;</Styled.PaginateButtonsListItem>
                            );
                    }

                    return (
                        <Styled.PaginateButtonsListItem key={index}>
                            <Styled.PaginationButton
                                className={pageNumber === currentPage ? 'selected' : ''}
                                onClick={onCertainPage.bind(this, pageNumber)}
                            >
                                {pageNumber}
                            </Styled.PaginationButton>
                        </Styled.PaginateButtonsListItem>
                    );
                })}
            </Styled.PaginateButtonsList>
            <Styled.NextPageButton onClick={onNext} disabled={isLastPage} className='next'>
                <IconCommon height='0.75rem' icon={arrowRight} className='icon' cursor='pointer'/>
            </Styled.NextPageButton>
        </Styled.Container>
    );
};
