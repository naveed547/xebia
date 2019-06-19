export interface PaginationProps {
    items: any;
    onChangePage: (num) => void;
    initialPage?: number;
    pageSize?: number;
}
