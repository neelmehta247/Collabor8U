import React from "react";
import ".././Notes.css";

export default class TopicListItem extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.dataKey);
        this.state = {
            isEditing: false,
            dataKey: this.props.dataKey,
            title: this.props.title,
        };
    }

    render() {
        return (
            <div className="TopicLst" data-key={this.props.dataKey} onClick={this.props.onClickHandler}>
                {this.props.title}
            </div>
        );
    }
}
