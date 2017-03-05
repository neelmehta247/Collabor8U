import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import Projects from "./Projects";
import "./index.css";
import {Router, Route, browserHistory} from "react-router";

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={LoginPage}/>
        <Route path="/home/" component={HomePage}/>
        <Route path="/projects/" component={Projects}/>
        <Route path="/notebook/:notebookId" component={NotebookPage}/>
    </Router>,
    document.getElementById('root')
);
