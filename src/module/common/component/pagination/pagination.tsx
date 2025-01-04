import arrowLeft from '@/assets/icons/default/arrow-left.svg';
import arrowRight from '@/assets/icons/default/arrow-right.svg';
import { usePagination } from '@/module/common/hooks';
import { IconCommon } from '@/module/common/styles';
import { IPaginationProps } from '@/module/common/types';

import * as Styled from './pagination.styled';

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

  return (
    <Styled.Container id='Pagination'>
      <Styled.PrevPageButton onClick={onPrevious} disabled={isFirstPage} className='prev'>
        <IconCommon height='0.75rem' icon={arrowLeft} className='icon' cursor='pointer' />
      </Styled.PrevPageButton>
      <Styled.PaginateButtonsList>
        {paginationRange?.map((pageNumber, index) => {
          if (typeof pageNumber === 'string') {
            return (
              <Styled.PaginateButtonsListItem key={index}>&#8230;</Styled.PaginateButtonsListItem>
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
        <IconCommon height='0.75rem' icon={arrowRight} className='icon' cursor='pointer' />
      </Styled.NextPageButton>
    </Styled.Container>
  );
};
