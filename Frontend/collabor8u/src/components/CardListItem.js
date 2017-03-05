import React from "react";
import ".././Notes.css";

export default class CardListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            body: this.props.body,
        };
    }

    render() {
        return (
            <div className="CardLst">
                <p>{this.state.body}</p>
            </div>
        );
    }
}
