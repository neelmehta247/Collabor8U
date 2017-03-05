import _ from "lodash";
import React from "react";
import CardListHeader from "./CardListHeader";
import CardListItem from "./CardListItem";
import TopicListItem from "./TopicListItem";

export default class CardsList extends React.Component {
    renderTopics() {
        console.log(this.props.topics);
        return _.map(this.props.topics, (topic) =>
            <TopicListItem key={topic.key} title={topic.name}/>);
    }

    renderCards() {
        return _.map(this.props.cards, (card) =>
            <CardListItem key={card.key} title={card.title} body={card.text}/>);
    }

    render() {
        return (
            <div>
                <CardListHeader />
                <div className="LeftPanel">
                    {this.renderTopics()}
                </div>
                <div className="RightPanel">
                    {this.renderCards()}
                </div>
            </div>
        );
    }
}
