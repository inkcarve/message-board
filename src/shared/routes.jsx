import { Router, Route, Link, browserHistory, IndexRoute ,DefaultRoute,RouteHandler} from 'react-router';



//createClass could not hot-load
const App = React.createClass({

render(){
  
//console.log(this) 
	return (
  <div className="container">
  <div><Link to="/">Home</Link></div>
  <div><Link to="/about">About</Link></div>
  <div><Link to="/message">Message</Link></div>
  {this.props.children}
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
class About extends React.Component{
render(){
  return (
    <div>
      <h2>About</h2>
      <p>Nothing...</p>
    </div>
  );
  }
};


//import extends Component could be hot-load
//file of Router couldn't hotupdate
import AppHandler from "./components/AppHandler.jsx";
import MessageBox from "./components/MessageBox.jsx";

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
    <Route path="message" component={MessageBox}></Route>
  </Route>
  </Router>
);
