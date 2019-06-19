import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Pagination from '../Pagination';
import { Link } from "react-router-dom";

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
	public truncString(str) {
		const length = 200;
		return str && str.length > length ? str.substring(0, length)+'...' : str;
	}
	public checkKey(str) {
		const keys = ['nyt://article/', 'nyt://interactive/'];
		return str.indexOf(keys[0]) !== -1 ? keys[0] : keys[1];
	}
	public render() {
		return (
			<React.Fragment>
				<div className="article-table">
					{this.state.pageOfItems.map((article, index) => {
						return (
							<div key={`article${uuid()}`.replace(/-/g, '')} className="article">
								<img src="" alt="" className="article-image" />
								<Link className="article-content" to={{
									pathname: `/detail/${article._id.split(this.checkKey(article._id))[1]}`,
									state: {
										article: JSON.stringify(article)
									}
								}}>
									<p className="article-abstract">
										{this.truncString(article.abstract)}
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
								</Link>
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
