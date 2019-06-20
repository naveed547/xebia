import * as React from 'react';
import {PaginationProps} from './Pagination.props';
import {PaginationState} from './Pagination.state';

class Pagination extends React.PureComponent<PaginationProps, PaginationState> {
    public static defaultProps = {
        initialPage: 1,
        pageSize: 5,
    };

    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    public componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    public componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    public setPage(page) {
        const { items, pageSize } = this.props;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);

        // get new page of items from items array
        const pageOfItems = (items.length && items.slice(pager.startIndex, pager.endIndex + 1)) || [];

        // update state
        this.setState({ pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    public getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage;
        let endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = [];
        for (let i = 0; i < ((endPage + 1) - startPage); i++) {
            pages.push(i + 1);
        }

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages,
        };
    }

    public render() {
        const pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={pager.currentPage === 1 ? 'disabled page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(1)}>First</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                    </li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active page-item' : 'page-item'}>
                            <a className="page-link" onClick={() => this.setPage(page)}>{page}</a>
                        </li>,
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled page-item' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a className="page-link" onClick={() => this.setPage(pager.totalPages)}>Last</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;
