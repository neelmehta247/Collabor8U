import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import NotebookPage from "./Pages/NotebookPage";
import Notes from "./Notes";
import "./index.css";
import {Router, Route, browserHistory} from "react-router";

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={LoginPage}/>
        <Route path="/home/" component={HomePage}/>
        <Route path="/notebook/:notebookId" component={NotebookPage}/>
        <Route path="/notes/" component={Notes}/>
    </Router>,
    document.getElementById('root')
);
