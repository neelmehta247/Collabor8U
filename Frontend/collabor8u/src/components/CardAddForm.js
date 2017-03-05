import React from "react";
import ".././Notes.css";

class CardAddForm extends React.Component {
    render() {
        return (
            <div>
                <form className="FormInput" onSubmit={this.handleCreate.bind(this)}>
                    <button className="AddCard">Add Card</button>
                </form>
                <form className="FormInput2" onSubmit={this.handleUser.bind(this)}>
                    <button className="AddCard"> Add Users</button>
                </form>
            </div>
        );
    }

    handleCreate(event) {
        event.preventDefault();
        this.props.createCard(true);
    }

    handleUser(event) {
        event.preventDefault();
        this.props.addUser();
    }
}

export default CardAddForm;
