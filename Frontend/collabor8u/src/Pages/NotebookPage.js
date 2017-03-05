import React from "react";
import Modal from "react-modal";

const customStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class NotebookPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_is_open: false,
            modal_is_edit: false,
            modal_current_text: "",
            notebook_id: this.props.params.notebookId,
        };
        this.modalOkButtonClick = this.modalOkButtonClick.bind(this);
        this.modalTextOnChange = this.modalTextOnChange.bind(this);
    }

    modalTextOnChange(e) {
        this.setState({modal_text: e.target.value});
    }

    modalOkButtonClick(e) {
        let is_edit = this.state.modal_is_edit;
        let content = this.state.modal_current_text;
        if(is_edit) {
            // Socket: cards/update
        } else {
            // POST cards/create
        }
    }

    openModal(e) {
        // Check target to determine if its edit or create
        let opp = e.target.attributes.getNamedItem("dataOppType");
        let isEdit = (opp == "edit") ? true : false;
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
                        <div className="Header"> PROJECTS</div>=
                            {this.state.notebook_id}
                        </div>
                    </div>
                </div>
        );
    }
}

export default NotebookPage;
