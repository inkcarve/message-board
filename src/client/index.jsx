import ReactDOM from "react-dom";
import React from "react";
import { Router, Route, Link, browserHistory, IndexRoute, HashLocation } from 'react-router';
import routes from "../shared/routes.jsx";

ReactDOM.render((routes), document.getElementById('app'));


//module.hot.accept();