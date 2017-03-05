/* global _ */

import React from "react";
import CardAddForm from "./CardAddForm";
import CardsList from "./CardsList";
import Modal from "react-modal";
import cookie from "react-cookie";
import $ from "jquery";
import io from "socket.io-client";
import "../Notes.css";

const customStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class NotesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session_token: cookie.load("session_token"),
            modal_is_open: false,
            modal_is_edit: false,
            modal_current_text: "",
            modal_current_title: "",
            modal_current_topics: "",
            notebook_id: this.props.params.notebookId,
            notebook_name: "Notebook",
            topics: [],
            cards: [],
            current_card: {},
            add_user_is_open: false,
            user_email: "",
        };

        this.socket = io.connect('http://collabor8u.herokuapp.com/');

        this.modalOkButtonClick = this.modalOkButtonClick.bind(this);
        this.modalTextOnChange = this.modalTextOnChange.bind(this);
        this.modalTopicsOnChange = this.modalTopicsOnChange.bind(this);
        this.modalTitleOnChange = this.modalTitleOnChange.bind(this);
        this.userEmailOnChange = this.userEmailOnChange.bind(this);
        this.addUserClick = this.addUserClick.bind(this);

        this.setNotebookState();

        let parent = this;

        this.socket.on('connect', () => {
            console.log('Connected');
            this.socket.emit('join', {notebook: parent.state.notebook_id});
        });

        this.socket.on('beginEdit', (card) => {
            let contained = false;
            let newCards = [];
            this.state.cards.forEach((stateCard) => {
                if (stateCard._id.toString() == card._id.toString()) {
                    contained = true;
                    newCards.push(card);
                } else {
                    newCards.push(stateCard);
                }
            });
            if (!contained) {
                newCards.push(card);
            }
            this.setState({cards: newCards});
        });

        this.socket.on('finishEdit', (card)=> {
            console.log(card);
            let contained = false;
            this.state.cards.forEach((stateCard) => {
                if (stateCard._id == card._id) {
                    contained = true;
                    this.state.cards.pop();
                    this.state.cards.push(card);
                }
            });
            if (!contained) {
                this.state.cards.push(card);
            }
            this.forceUpdate();
            this.setNotebookState();
            parent.setState({cards: this.state.cards});
        });

        this.socket.on('edit', (card)=> {
            let contained = false;
            let newCards = [];
            console.log(this.state.cards);
            this.state.cards.forEach((stateCard) => {
                if (stateCard._id.toString() == card._id.toString()) {
                    contained = true;
                    newCards.push(card);
                } else {
                    newCards.push(stateCard);
                }
            });
            if (!contained) {
                newCards.push(card);
            }
            this.setState({cards: newCards});
            console.log(this.state.cards);
            this.setNotebookState();
        });

        this.socket.on('updateTitle', (card)=> {
            let contained = false;
            let newCards = [];
            this.state.cards.forEach((stateCard) => {
                if (stateCard._id.toString() == card._id.toString()) {
                    contained = true;
                    this.state.cards.pop();
                    this.state.cards.push(card);
                }
            });
            if (!contained) {
                this.state.cards.push(card);
            }
        });
    }

    editCard(card) {
        console.log(card);
        this.setState({
            modal_current_topics: card.topics.map((topic) => topic.name).join(','),
            modal_current_text: card.text,
            modal_current_title: card.title,
            current_card: card._id,
        });
        this.openModal(true);
    }

    setNotebookState() {
        let url = "http://collabor8u.herokuapp.com/notebooks/" + this.state.notebook_id;

        $.ajax({
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            method: 'GET',
            url: url,
            error: (e) => {
                console.log(e);
                console.log("status: " + e.status);
            },
            success: (data) => {
                this.setState({
                    notebook_name: data.name,
                    cards: data.cards,
                    topics: data.topics,
                });
            },
        });
    }

    modalTopicsOnChange(e) {
        this.setState({modal_current_topics: e.target.value});
    }

    modalTextOnChange(e) {
        this.setState({modal_current_text: e.target.value});

        if (this.state.modal_is_edit) {
            this.socket.emit('edit', {
                notebook: this.state.notebook_id,
                card_id: this.state.current_card,
                text: e.target.value
            });
        }
    }

    modalTitleOnChange(e) {
        this.setState({modal_current_title: e.target.value});

        if (this.state.modal_is_edit) {
            this.socket.emit('updateTitle', {
                notebook: this.state.notebook_id,
                card_id: this.state.current_card,
                title: e.target.value
            });
        }
    }

    modalOkButtonClick(e) {
        this.setState({modal_is_open: false});
        if (this.state.modal_current_topics &&
            this.state.modal_current_text &&
            this.state.modal_current_title) {

            let is_edit = this.state.modal_is_edit;
            let content = this.state.modal_current_text;
            if (is_edit) {
                this.socket.emit('finishEdit', {notebook: this.state.notebook_id, card_id: this.state.current_card});
                this.forceUpdate();
                this.setNotebookState();
            } else {
                let topics = this.state.modal_current_topics.split(',');

                let url = "http://collabor8u.herokuapp.com/notebooks/" + this.state.notebook_id + "/cards/new";
                let object = {
                    session_token: this.state.session_token,
                    title: this.state.modal_current_title,
                    topics: topics
                };
                let parent = this;
                $.ajax({
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    method: 'POST',
                    data: JSON.stringify(object),
                    url: url,
                    error: (e) => {
                        console.log(e);
                        console.log("status: " + e.status);
                    },
                    success: (data) => {
                        this.socket.emit('edit', {notebook: this.state.notebook_id, card_id: data._id, text: content});
                        this.socket.emit('finishEdit', {notebook: this.state.notebook_id, card_id: data._id});
                        this.forceUpdate();
                        parent.setNotebookState();
                    },
                });
            }
        }
    }

    openModal(isEdit) {
        // Check target to determine if its edit or create
        // let opp = e.target.attributes.getNamedItem("dataOppType");
        // let isEdit = (opp == "edit");

        if (isEdit) {
            this.socket.emit('beginEdit', {notebook: this.state.notebook_id, card_id: this.state.current_card});
        }

        this.setState({
            modal_is_open: true,
            modal_is_edit: isEdit
        });
    }

    createCard(tag) {
        this.setState({
            modal_current_topics: '',
            modal_current_text: '',
            modal_current_title: ''
        });

        // Call modal, put bottom lines there
        this.openModal(false);
        // this.state.cards.push(tag);
        // this.setState({ cards: this.state.cards });
    }

    userEmailOnChange(e) {
        this.setState({
            user_email: e.target.value
        });
    }

    addUserClick(e) {
        this.setState({
            add_user_is_open: false
        });

        let url = "http://collabor8u.herokuapp.com/notebooks/" + this.state.notebook_id + '/add_user';
        let object = {session_token: this.state.session_token, email: this.state.user_email};

        $.ajax({
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(object),
            url: url,
            error: (e) => {
                console.log(e);
                console.log("status: " + e.status);
            },
            success: (data) => {

            },
        });
    }

    addUser() {
        this.setState({
            add_user_is_open: true
        });
    }

    render() {
        return (
            <div className="NotesMain">
                <Modal
                    isOpen={this.state.modal_is_open}
                    onRequestClose={this.modalOkButtonClick}
                    style={customStyle}
                    contentLabel="Add Project">
                    <h1>Notes</h1>
                    <input placeholder="Title"
                           onChange={this.modalTitleOnChange} value={this.state.modal_current_title}/>
                    <input placeholder="Text" onChange={this.modalTextOnChange} value={this.state.modal_current_text}/>
                    <input placeholder="Topics"
                           onChange={this.modalTopicsOnChange}
                           disabled={this.state.modal_is_edit} value={this.state.modal_current_topics}/>
                    <button onClick={this.modalOkButtonClick}>Ok</button>
                </Modal>
                <Modal
                    isOpen={this.state.add_user_is_open}
                    onRequestClose={this.addUserClick}
                    style={customStyle}
                    contentLabel="Add User">
                    <h1>Add User</h1>
                    <input placeholder="Email"
                           onChange={this.userEmailOnChange}/>
                    <button onClick={this.addUserClick}>Ok</button>
                </Modal>
                <div className="TopicHeader">{this.state.notebook_name}</div>
                <div className="TopicBody">
                    <CardAddForm createCard={this.createCard.bind(this)} addUser={this.addUser.bind(this)}/>
                    <CardsList
                        editCard={this.editCard.bind(this)}
                        topics={this.state.topics}
                        cards={this.state.cards}
                    />
                </div>
            </div>
        );
    }
}

export default NotesPage;
