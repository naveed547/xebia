import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Pagination from '../Pagination';

import {ListTableProps} from './ListTable.props';
import {ListTableState} from './ListTable.state';

import './ListTable.scss';

class ListTable extends React.PureComponent<ListTableProps, ListTableState> {
	constructor(props) {
		super(props);
		this.state = {
            pageOfItems: [],
        };
		this.onChangePage = this.onChangePage.bind(this);
	}
	public onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems });
	}
	public render() {
		return (
			<React.Fragment>
				<div className="article-table">
					{this.state.pageOfItems.map((article, index) => {
						return (
							<div key={`article${uuid()}`.replace(/-/g, '')} className="article">
								<img src="" alt="" className="article-image" />
								<a className="article-content" href={article.web_url} target="_blank">
									<p className="article-abstract">
										{article.abstract}
									</p>
									<p className="article-from">
										<span className="by">{article.byline.original}</span>
										{article.pub_date && (
											<span className="date">
												<i className="fa fa-calendar"></i> &nbsp;
												{article.pub_date.split("T")[0]}
											</span>
										)}
									</p>
								</a>
								<i className="fa fa-chevron-right"></i>
							</div>
						)
					})}
				</div>
				<Pagination items={this.props.articleList} onChangePage={this.onChangePage} />
			</React.Fragment>
		);
	}
}

export default ListTable;
