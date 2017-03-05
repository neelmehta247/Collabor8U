import React from 'react';
import '.././Notes.css'

export default class CardListHeader extends React.Component {
    render() {
        return (
                <div className="TopicBody">
                    <div className="TagCol">Tags</div>
                    <div className="CardCol">Cards</div>
                </div>
        );
    }
}
