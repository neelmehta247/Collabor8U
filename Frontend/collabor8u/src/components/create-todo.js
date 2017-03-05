import React from 'react';
import ReactDOM from 'react-dom';
import '.././Notes.css'

export default class TodosList extends React.Component {
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
                    <input className="InputStyle" type="text" placeholder="What do I need to do?" ref="createInput" />
                    <button className="AddTask">Create</button>
                </div>
                    {this.renderError()}
                </form>
            
        );
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        this.setState({ error: null });
        this.props.createTask(task);
        this.refs.createInput.value = '';
    }

    validateInput(task) {
        if (!task) {
            return 'Please enter a task.';
        } else if (find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exists.';
        } else {
            return null;
        }
    }
}
