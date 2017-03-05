import React from 'react';
import '.././Notes.css'

export default class TodosListHeader extends React.Component {
    render() {
        return (
                <div className="TopicBody">
                    <div className="TagCol">Tags</div>
                    <div className="ActionCol">Cards</div>
                </div>

        );
    }
}
