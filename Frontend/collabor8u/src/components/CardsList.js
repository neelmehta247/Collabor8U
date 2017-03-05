import _ from 'lodash';
import React from 'react';
import CardListHeader from './CardListHeader';
import CardListItem from './CardListItem';

export default class CardsList extends React.Component {
    renderTopics() {
        return _.map(this.props.topics, (topic) =>
            <CardListItem key={topic.key} title={topic.title} />);
    }

    renderCards() {
        return _.map(this.props.cards, (card) =>
            <CardListItem key={card.key} body={card.body} />);
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
