import React from "react";
import Modal from "react-modal";
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
            modal_is_open: false,
            modal_is_edit: false,
            modal_current_text: "",
            notebook_id: this.props.params.notebookId,
        };
        this.modalOkButtonClick = this.modalOkButtonClick.bind(this);
        this.modalTextOnChange = this.modalTextOnChange.bind(this);

        let parent = this;

        socket.on('connect', function () {
            console.log('Connected');
            socket.emit('join', {notebook: parent.state.notebook_id});
        });

        // if scan doesn't return any card, like if the card is not in the state, add a new card to the state
        socket.on('beginEdit', function (card) {
             // card is the card that began being edited. scan through the cards in the state and update whichever one is necessary
        });

        socket.on('finishEdit', function (card) {
            // card is the card that finished being edited. scan through the cards in the state and update whichever one is necessary
        });

        socket.on('edit', function (card) {
            // card is the card that is being edited. scan through the cards in the state and update whichever one is necessary
        });

        socket.on('updateTitle', function (card) {
            // card is the card whose title has been updated.
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
