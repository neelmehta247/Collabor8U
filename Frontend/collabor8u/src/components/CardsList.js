import _ from "lodash";
import React from "react";
import CardListHeader from "./CardListHeader";
import CardListItem from "./CardListItem";
import TopicListItem from "./TopicListItem";

export default class CardsList extends React.Component {
    renderTopics() {
        console.log(this.props.topics);
        return _.map(this.props.topics, (topic) =>
            <TopicListItem dataKey={topic._id} title={topic.name}/>);
    }

    renderCards() {
        return _.map(this.props.cards, (card) =>
            <CardListItem dataKay={card._id} title={card.title} body={card.text}
            topics={card.topics} allTopics={this.props.topics} editCard={this.props.editCard}/>);
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
