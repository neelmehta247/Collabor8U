import React from 'react';
import ReactDOM from 'react-dom';
import '.././Notes.css'

export default class CardAddForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    renderError() {
        if (!this.state.error) { return null; }
        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }

    render() {
        return (
                <form className="FormInput" onSubmit={this.handleCreate.bind(this)}>
                <div className="FormWrapper">
                    <input className="InputStyle" type="text" placeholder="Enter topics" ref="createInput" />
                    <button className="AddCard">Add Card</button>
                </div>
                    {this.renderError()}
                </form>

        );
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const tag = createInput.value;
        const validateInput = this.validateInput(tag);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        this.setState({ error: null });
        this.props.createCard(tag);
        this.refs.createInput.value = '';
    }

    validateInput(tag) {
        if (!tag) {
            return 'Please enter a tag.';
        } else {
            return null;
        }
    }
}
