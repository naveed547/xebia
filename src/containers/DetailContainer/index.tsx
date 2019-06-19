

import * as React from "react";
import { Loader } from "Components/Loader";
import ListDetail from "Components/ListDetail";
import API from 'Api/config';

import "./style.scss";

import { DetailContainerProps } from './DetailContainer.props';

export class DetailContainer extends React.Component<DetailContainerProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      articleItem: JSON.parse(props.location.state.article),
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
    if (!this.state.articleItem || !Object.keys(this.state.articleItem).length) {
      this.setState({
        showLoader: true,
      });
      const docs = await this.retriveArticleList();
      const { articleId } = this.props.match.params;
      const doc = docs.filter(doc => (
          doc._id === ("nyt://article/" + articleId) || 
          doc._id === ("nyt://interactive/" + articleId)
        )
      )[0];
      if(!doc && Object.keys(doc).length) this.props.history.push("/");
      else {
        this.setState({
          showLoader: false,
          articleItem: doc
        });
      }
    }
  }
  public render() {
    return (
      <div className="container">
        <section className="boards-container">
          {this.state.articleItem && Object.keys(this.state.articleItem).length && !this.state.showLoader ? (
            <ListDetail item={this.state.articleItem} />
          ) : <Loader />}
        </section>
      </div>
    );
  }
}

export default DetailContainer;
