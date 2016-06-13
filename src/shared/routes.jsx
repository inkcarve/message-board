import { Router, Route, Link, isActive, browserHistory, IndexRoute ,DefaultRoute, RouteHandler} from 'react-router';
const socket = io.connect();

socket.on('socket', function(data){
  console.log(data);
});

//createClass could not hot-load
const App = React.createClass({
render(){
	return (
<div>
  <nav className="navbar navbar-default">
  <div className="container">
    <div className="navbar-header">
    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
      <a className="navbar-brand" href="/">M<span>.</span>to<span>.</span>Me</a>
    </div>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
      <NavLink data={{title:'Home',path:"/",pathnow:this.props.location.pathname}}/>
      <NavLink data={{title:'About',path:"/about",pathnow:this.props.location.pathname}}/>
      <NavLink data={{title:'Message List',path:"/message",pathnow:this.props.location.pathname}}/>
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

const NavLink = React.createClass({
  render(){
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
    <div className="about">
      <h2>About</h2>
      <h3 className="sub_title">React <span>+</span> Babel <span>+</span> Webpack <span>+</span> ...</h3>
      <p>Practice of Learning New Skill.</p>
    </div>
  );
  }
};


//import extends Component could be hot-load
//file of Router couldn't hotupdate
import Home from "./components/Home.jsx";
import MessageBox from "./components/MessageBox.jsx";
import MessageList from "./components/MessageList.jsx";
import MessageForm from "./components/MessageForm.jsx";
import RenewData from './components/RenewData.js';

export default (
  // method 2: by react router
  <Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="about" component={About}></Route>
    <Route path="message" component={MessageBox}>
      <IndexRoute component={MessageList}></IndexRoute>
      <Route path="write" component={MessageForm}></Route>
    </Route>
  </Route>
  </Router>
);
