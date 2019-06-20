import * as React from 'react';

import {ListDetailProps} from './ListDetail.props';
import {ListDetailState} from './ListDetail.state';

import './ListDetail.scss';

class ListDetail extends React.PureComponent<ListDetailProps, ListDetailState> {
	constructor(props) {
		super(props);
	}
	public render() {
		const { item } = this.props;
		const imgSrc = item.multimedia && item.multimedia[0] && item.multimedia[0].url ? ('https://static01.nyt.com/' + item.multimedia[0].url) : '';
		return item && (
			<React.Fragment>
				<div className="article">
					<div className="article-description">
						<h1 className="article-header">{item.headline.main}</h1>
						<p className="article-para">{item.lead_paragraph}</p>
						<p className="article-from">
							<span className="by">{item.byline.original}</span>
							{item.pub_date && (
								<span className="date">
									<i className="fa fa-calendar"></i> &nbsp;
									{item.pub_date.split("T")[0]}
								</span>
							)}
						</p>
					</div>
					{imgSrc && (
						<div className="article-image">
							<img src={imgSrc} alt="banner image"/>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default ListDetail;
