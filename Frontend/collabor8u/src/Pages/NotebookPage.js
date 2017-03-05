import React from "react";

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
                {this.state.notebook_id}
            </div>
        );
    }
}

export default NotebookPage;
