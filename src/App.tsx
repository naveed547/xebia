import * as React from "react";
import { BrowserRouter, Route,  Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";

import "./styles/styles.scss";
import ListContainer from 'Containers/ListContainer';
import DetailContainer from 'Containers/DetailContainer';

export default class App extends React.Component<any, any> {
  public render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact={true} strict={true} path="/" render={(props) => (<ListContainer {...props} />)} />
            <Route path="/detail/:articleId" render={(props) => (<DetailContainer {...props} />)} />
            <Route component={render => (<div>no data </div>)} />
          </Switch>
        </BrowserRouter>
    );
  }
}
