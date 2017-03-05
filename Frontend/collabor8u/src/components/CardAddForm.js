import React from 'react';
import ReactDOM from 'react-dom';
import '.././Notes.css'

class CardAddForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <form className="FormInput" onSubmit={this.handleCreate.bind(this)}>
                    <button className="AddCard">Add Card</button>
                </form>
        );
    }

    handleCreate(event) {
        event.preventDefault();
        this.props.createCard(true);
    }
}

export default CardAddForm;
