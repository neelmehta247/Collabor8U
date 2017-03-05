import _ from "lodash";
import React from "react";
import {Col, Row} from "react-bootstrap";
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
            card_id: this.props.key,
        };
    }

    getTopic(id) {
        let all_topics = this.state.all_topics;
        let topic = null;
        all_topics.forEach((_topic) => {
            if (_topic._id == id) {
                console.log(_topic);
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
            (<button dataKey={topic._id}>{topic.name}</button>));
    }

    handleEditClick(event) {
        event.preventDefault();
        this.props.editCard({
            topics: this.state.all_topics,
            text: this.state.text,
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
