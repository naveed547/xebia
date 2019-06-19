

import * as React from "react";
import { Loader } from "Components/Loader";
import ListTable from "Components/ListTable";
import API from 'Api/config';

import "./style.scss";

import { ListContainerState } from './ListContainer.state';

export class ListContainer extends React.Component<any, ListContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      articleList: [],
    };
    this.retriveArticleList = this.retriveArticleList.bind(this);
  }
  public async retriveArticleList() {
    return fetch(`${API.url}?&api-key=${API.key}`)
    .then((res) => res.json())
    .then(data => data.response.docs)
    .catch(error => console.error(error));
  }
  public async componentDidMount() {
    if (!this.state.articleList.length) {
      this.setState({
        showLoader: true,
      });
      const docs = await this.retriveArticleList();
      this.setState({
        showLoader: false,
        articleList: docs
      });
    }
  }
  public render() {
    return (
      <div className="container">
        <section className="boards-container">
          {this.state.articleList && this.state.articleList.length && !this.state.showLoader ? (
            <ListTable articleList={this.state.articleList} />
          ) : <Loader />}
        </section>
      </div>
    );
  }
}

export default ListContainer;
