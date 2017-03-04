import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';
import Home from './Home';
import './index.css';
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={LoginPage}>
      <Route path="/home/accessToken" component={Home}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
