//import { Route } from "react-router";
import React from "react";

import { Router, Route, Link, browserHistory, IndexRoute ,DefaultRoute,RouteHandler} from 'react-router';

//createClass could not hot-load
const App = React.createClass({
render(){
	return (
  <div className="container">
  {this.props.children}
  <div><Link to="/about">About</Link></div>
  </div>
  );
  }
});
const Home = React.createClass({
render(){
	return (
  <h1>Hello, world!test2</h1>
  );
  }
});

//create class and extends
//extends Component could be hot-load
class About extends React.Component{
render(){
  return (
  <h2>About</h2>
  );
  }
};

import AppHandler from "./components/AppHandler.jsx";


/* method 1 : by router config
const routesConfig = {
  path: '/',
  component: App,
  indexRoute: { component: AppHandler },
  childRoutes: [
    { path: 'about', component: About },
  ]
  }
  export default (<Router history={browserHistory} routes={routesConfig}>
  </Router>);
  */

export default (
  // method 2: by react router
  <Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={AppHandler}></IndexRoute>
    <Route path="about" component={About}></Route>
  </Route>
  </Router>
);
