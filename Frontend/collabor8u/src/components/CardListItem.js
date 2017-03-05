import _ from "lodash";
import React from "react";
import {Col, Row, Button} from "react-bootstrap";
import ".././Notes.css";

export default class CardListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            all_topics: this.props.allTopics,
            topics: this.props.topics,
            title: this.props.title,
            body: this.props.body,
            card_id: this.props.dataKay,
        };
        console.log(this.state.card_id);
    }

    getTopic(id) {
        let all_topics = this.state.all_topics;
        let topic = null;
        all_topics.forEach((_topic) => {
            if (_topic._id == id) {
                topic = _topic;
            }
        });
        return topic;
    }

    renderTopics() {
        var topics = [];
        this.state.topics.forEach((id) => {
            topics.push(this.getTopic(id));
        });
        return _.map(topics, (topic) =>
            (<Button bsStyle="primary" dataKey={topic._id}>{topic.name}</Button>));
    }

    handleEditClick(event) {
        event.preventDefault();
        var topics = [];
        this.state.topics.forEach((id) => {
            topics.push(this.getTopic(id));
        });
        this.props.editCard({
            topics: topics,
            text: this.state.body,
            title: this.state.title,
            _id: this.state.card_id
        });
    }

    render() {
        return (
            <Col md={3} className="CardLst">
                <div className="wrapper">
                    <Row className="CartTitle">{this.state.title}</Row>
                    <Row className="CartTags">{this.renderTopics()}</Row>
                    <Row className="CartBody">{this.state.body}</Row>
                </div>
                <button className="EditBtn" onClick={this.handleEditClick.bind(this)}> Edit</button>
            </Col>
        );
    }
}
