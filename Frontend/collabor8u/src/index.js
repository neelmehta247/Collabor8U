import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import Home from './Home';
import './index.css';
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LoginPage}/>
    <Route path="/home/" component={Home}/>
  </Router>,
  document.getElementById('root')
);
