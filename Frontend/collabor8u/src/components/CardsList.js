import _ from 'lodash';
import React from 'react';
import CardListHeader from './CardListHeader';
import CardListItem from './CardListItem';

export default class CardsList extends React.Component {
    renderItems() {
        const props = _.omit(this.props, 'cards');

        return _.map(this.props.cards, (card, index) =>
            <CardListItem key={index} {...card} {...props} />);
    }

    render() {
        return (
            <div>
                <CardListHeader />
                <div className="LeftPanel">
                    {this.renderItems()}
                </div>
                <div className="RightPanel">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}
