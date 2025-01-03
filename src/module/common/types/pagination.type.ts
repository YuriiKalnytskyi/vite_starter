export interface IPaginationProps {
  onPageChange: (page: number) => void;
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
}

export interface IUsePaginationHookProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}
