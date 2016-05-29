import { Router, Route, Link, isActive, browserHistory, IndexRoute ,DefaultRoute, RouteHandler} from 'react-router';



//createClass could not hot-load
const App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object,
  },

render(){
  console.log(this)
  console.log(this.context.router.isActive('/'))
	return (
<div>
  <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">Message</a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
      <NavLink data={{title:'Home',path:"/",pathnow:this.props.location.pathname}}/>
      <NavLink data={{title:'About',path:"/about",pathnow:this.props.location.pathname}}/>
      <NavLink data={{title:'Message',path:"/message",pathnow:this.props.location.pathname}}/>
      <NavLink data={{title:'Write',path:"/message/write",pathnow:this.props.location.pathname}}/>
      </ul>
    </div>  
    </div>
  </nav>
  <div className="container">
  {this.props.children}
  </div>
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

const NavLink = React.createClass({
  isActiveLink:function(){
    console.log(this.props.path)
    return isActive(this.props.path);
  },
  render(){
    console.log(this);
    const data = this.props.data;
    return(
      <li className ={(data.path == data.pathnow)?'active':''}>
        <Link to={data.path} >{data.title}</Link>
      </li>
      );
  }
})

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
import MessageList from "./components/MessageList.jsx";
import MessageForm from "./components/MessageForm.jsx";
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
    <Route path="message" component={MessageBox}>
      <IndexRoute component={MessageList} ></IndexRoute>
      <Route path="write" component={MessageForm}></Route>
    </Route>
  </Route>
  </Router>
);
