import React from "react";
import cookie from "react-cookie";
import {browserHistory} from "react-router";
import Modal from "react-modal";
import $ from "jquery";
import './HomePage.css';
import plus from "../img/plus.png";

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

class Notebook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: props.title,
                     data_key:props.dataKey,};
        this.notebookOnClick = this.notebookOnClick.bind(this);
    }

    notebookOnClick(event) {
        let key = this.state.data_key;
        browserHistory.push('/notebook/' + key);
    }

    render() {
        return (
            <button className="NewNotebook" onClick={this.notebookOnClick}>
                {this.props.title}
            </button>
        );
    }
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        let url = "https://collabor8u.herokuapp.com/users/login";
        let accessToken = cookie.load("accessToken");
        this.state = {
            session_token: "",
            user_id: "",
            user: [],
            inputList: [],
            is_open: false,
        };
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.modalTextOnChange = this.modalTextOnChange.bind(this);
        this.modalOkButtonClick = this.modalOkButtonClick.bind(this);

        var obje = {facebook_access_token: accessToken};
        $.ajax({
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            method: 'POST',
            url: url,
            data: JSON.stringify(obje),
            error: (e) => {
                console.log(e);
                console.log("status: " + e.status);
                browserHistory.push('/');
            },
            success: (data) => {
                this.setState({session_token: data.session_token,
                            user_id: data.user._id,
                            user: data.user});
                this.populateNotebooks();
            },
        });
    }

    onAddBtnClick(event) {
        this.setState({is_open: true});
    }

    refreshUsersState() {
        console.log(this.state.user_id);
        let url = "https://collabor8u.herokuapp.com/users/" + this.state.user_id;
        $.ajax({
            method: 'GET',
            url: url,
            error: (e) => {
                console.log("status: " + e.status);
                browserHistory.push('/');
            },
            success: (data) => {
                this.setState({user: data});
                this.populateNotebooks();
            },
        });
    }

    populateNotebooks() {
        const notebooks = this.state.user.notebooks;
        this.setState({inputList: []});
        this.forceUpdate();
        notebooks.forEach((notebook) => {
            // GET /notebooks/id
            // POST /notebooks/create
            let url = "https://collabor8u.herokuapp.com/notebooks/" + notebook;

            $.ajax({
                method: 'GET',
                url: url,
                error: (e) => {
                    console.log("status: " + e.status);
                },
                success: (data) => {
                    this.addItem(data.name, data._id);
                },
            });
        });
    }

    addItem(_title, _key) {
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(<Notebook dataKey={_key} title={_title}/>)
        });
    }

    modalTextOnChange(e) {
        this.setState({modal_text: e.target.value});
    }

    modalOkButtonClick(e) {
        this.setState({is_open: false});
        console.log(this.state.modal_text);
        // Trigger project creation event
        let url = "https://collabor8u.herokuapp.com/notebooks/create";
        var obje = {name: this.state.modal_text,
                    session_token: this.state.session_token};
        $.ajax({
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            method: 'POST',
            url: url,
            data: JSON.stringify(obje),
            error: (e) => {
                console.log("status: " + e.status);
                browserHistory.push('/');
            },
            success: (data) => {
                this.refreshUsersState();
            },
        });
    }

    render() {
        return (
            <div className="Main">
                <div className="Container">
                    <Modal
                        isOpen={this.state.is_open}
                        onRequestClose={this.modalOkButtonClick}
                        style={customStyle}
                        contentLabel="Add Project">
                        <h1>Add Project</h1>
                        <input onChange={this.modalTextOnChange}/>
                        <button onClick={this.modalOkButtonClick}>Ok</button>
                    </Modal>
                    <div className="Header"> PROJECTS</div>
                        <div className="MainTable">
                            <button className="addBtn" onClick={this.onAddBtnClick}>
                                <img src={plus} className="PlusImg" alt="plus"/>
                            </button>

                            <div className="ChildBtn">
                                {this.state.inputList}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default HomePage;
