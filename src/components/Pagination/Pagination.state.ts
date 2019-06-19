
export interface PaginationState {
    pager: {
        totalItems?: number;
        currentPage?: number;
        pageSize?: number;
        totalPages?: number;
        startPage?: number;
        endPage?: number;
        startIndex?: number;
        endIndex?: number;
        pages?: any;
    };
}
