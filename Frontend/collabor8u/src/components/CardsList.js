import _ from "lodash";
import React from "react";
import $ from "jquery";
import CardListHeader from "./CardListHeader";
import CardListItem from "./CardListItem";
import TopicListItem from "./TopicListItem";

export default class CardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards_to_render: this.props.cards,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.cards)
        this.setState({cards_to_render: nextProps.cards});
    }

    filterCards (event) {
        let key = event.target.attributes.getNamedItem("data-key").value;
        var cards = [];
        this.props.cards.forEach((card) => {
            if(card.topics.includes(key.toString())) {
                cards.push(card);
            }
        });
        this.setState({cards_to_render: cards});
        this.forceUpdate();
    }

    renderTopics() {
        return _.map(this.props.topics, (topic) =>
            <TopicListItem dataKey={topic._id} title={topic.name}
            onClickHandler={this.filterCards.bind(this)}/>);
    }

    renderCards() {
        return _.map(this.state.cards_to_render, (card) =>
            <CardListItem dataKay={card._id} title={card.title} body={card.text}
            topics={card.topics} allTopics={this.props.topics} editCard={this.props.editCard}
            onClickHandlerForTopics={this.filterCards.bind(this)}/>);
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
