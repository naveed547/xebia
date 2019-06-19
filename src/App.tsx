import * as React from "react";
import { BrowserRouter, Route,  Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";

import "./styles/styles.scss";
import ListContainer from 'Containers/ListContainer';

export default class App extends React.Component<any, any> {
  public render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" render={(props) => (<ListContainer {...props} />)} />
            <Route component={render => (<div>no data </div>)} />
          </Switch>
        </BrowserRouter>
    );
  }
}
