import React from "react";
import logo from "./logo.svg";
import "./App.css";

class NotebookPage extends React.Component {
    constructor() {
        super();
        this.state = {
            notebook_id: this.props.params.repoName,
        };
    }

    render() {
        return (
            <div>
                //{content}
            </div>
        );
    }
}

export default NotebookPage;
