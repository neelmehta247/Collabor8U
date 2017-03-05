import React from "react";
import ".././Notes.css";

class CardAddForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form className="FormInput" onSubmit={this.handleCreate.bind(this)}>
                    <button className="AddCard">Add Card</button>
                </form>
                <form className="FormInput2">
                    <button className="AddCard"> Add Users</button>
                </form>
            </div>
        );
    }

    handleCreate(event) {
        event.preventDefault();
        this.props.createCard(true);
    }
}

export default CardAddForm;
