/* global _ */

import React from 'react';
import CardAddForm from './CardAddForm';
import CardsList from './CardsList';
import '.././Notes.css'


class NotesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topics: [],
            cards: [],
        };
    }

    render() {
        return (
            <div className="NotesMain">
                <div className="TopicHeader">Topics</div>
                <div className="TopicBody">
                <CardAddForm createCard={this.createCard.bind(this)} />
                <CardsList
                    tags={this.state.tags}
                    cards={this.state.cards}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
                </div>
            </div>
        );
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }

    createCard(tag) {
        // Call modal, put bottom lines there
        console.log("shit is happening");
        this.state.cards.push(tag);
        this.setState({ cards: this.state.cards });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }
}

export default NotesPage;
