import React from "react";
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

const socket = io('http://collabor8u.herokuapp.com');

class NotebookPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.params.notebookId);
        this.state = {
            session_token: cookie.load("session_token"),
            modal_is_open: false,
            modal_is_edit: false,
            modal_current_text: "",
            notebook_id: this.props.params.notebookId,
            topics: "",
            cards: "",
        };
        this.modalOkButtonClick = this.modalOkButtonClick.bind(this);
        this.modalTextOnChange = this.modalTextOnChange.bind(this);

        this.setNotebookState();

        let parent = this;

        socket.on('connect', () => {
            console.log('Connected');
            socket.emit('join', {notebook: parent.state.notebook_id});
        });

        socket.on('beginEdit', (card) => {
            let contained = false;
            let newCards = [];
            this.state.cards.forEach((stateCard) => {
                if (stateCard._id.equals(card._id)) {
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

        socket.on('finishEdit', (card)=> {
            let contained = false;
            let newCards = [];
            this.state.cards.forEach((stateCard) => {
                if (stateCard._id.equals(card._id)) {
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

        socket.on('edit', (card)=> {
            let contained = false;
            let newCards = [];
            this.state.cards.forEach((stateCard) => {
                if (stateCard._id.equals(card._id)) {
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

        socket.on('updateTitle', (card)=> {
            let contained = false;
            let newCards = [];
            this.state.cards.forEach((stateCard) => {
                if (stateCard._id.equals(card._id)) {
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
                    cards: data.cards,
                    topics: data.topics
                });
            },
        });
    }

    modalTextOnChange(e, card_id) {
        this.setState({modal_text: e.target.value});

        socket.emit('edit', {notebook: this.state.notebook_id, card_id: card_id, text: e.target.value});
    }

    modalOkButtonClick(e, card_id) {
        let is_edit = this.state.modal_is_edit;
        let content = this.state.modal_current_text;
        if (is_edit) {
            socket.emit('finishEdit', {notebook: this.state.notebook_id, card_id: card_id});
        } else {
            // POST cards/create
        }
    }

    openModal(e, card_id) {
        // Check target to determine if its edit or create
        let opp = e.target.attributes.getNamedItem("dataOppType");
        let isEdit = (opp == "edit");

        if (isEdit) {
            socket.emit('beginEdit', {notebook: this.state.notebook_id, card_id: card_id});
        }

        this.setState({modal_is_edit: isEdit});
        this.setState({modal_is_open: true});
    }

    render() {
        return (
            <div>
                <div>
                    <Modal
                        isOpen={this.state.is_open}
                        onRequestClose={this.modalOkButtonClick}
                        style={customStyle}
                        contentLabel="Add Project">
                        <h1>Add Project</h1>
                        <input onChange={this.modalTextOnChange}/>
                        <button onClick={this.modalOkButtonClick}>Ok</button>
                    </Modal>
                </div>
                <div className="Main">
                    <div className="Container">
                        <div className="Header"> PROJECTS</div>
                        =
                        {this.state.notebook_id}
                    </div>
                </div>
            </div>
        );
    }
}

export default NotebookPage;
