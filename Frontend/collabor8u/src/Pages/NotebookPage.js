import React from "react";

class NotebookPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notebook_id: this.props.params.notebookId,
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
