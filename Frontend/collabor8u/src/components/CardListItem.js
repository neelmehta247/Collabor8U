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
        };
    }

    getTopic(id) {
        let all_topics = this.state.all_topics;
        all_topics.forEach((topic) => {
            if(topic._id[0] == id[0]) {
                return topic;
            }
        });
    }

    renderTopics() {
        let topics = []
        this.state.topics.forEach((id) => {
            topics.push(getTopic(id));
        })
        console.log(this.state.topics);
        return _.map(this.state.topics, (topic) =>
            (<button dataKey={topic._id}>{topic.title}</button>));
    }

    render() {
        return (
<<<<<<< Updated upstream
            <Col md={3} className="CardLst">
            <div className="wrapper">
                <Row className="CartTitle">{this.state.title}</Row>
                <Row className="CartTags">{this.renderTopics()}</Row>
                <Row className="CartBody">{this.state.body}</Row>
=======
            <div className="CardLst">
                <p>{this.state.body}</p>
                <button className="EditBtn"> Edit </button>
>>>>>>> Stashed changes
            </div>
            </Col>
        );
    }
}
