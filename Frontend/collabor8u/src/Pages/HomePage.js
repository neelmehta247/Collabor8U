import React from "react";
import cookie from "react-cookie";
import {browserHistory} from "react-router";
import $ from "jquery";
import './HomePage.css';
import plus from "../img/plus.png";

class Projects extends React.Component {
    constructor() {
        super();
        this.notebookOnClick = this.notebookOnClick.bind(this);
    }

    notebookOnClick(event) {
        browserHistory.push('/notebook/' + event.key);
    }

    render() {
        return <button className="NewProject" onClick={this.notebookOnClick}>
            {this.props.title}
        </button>;
    }
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        let url = "https://collabor8u.herokuapp.com/users/login";
        let accessToken = cookie.load("accessToken");
        this.state = {
            session_object: {},
            inputList: [],
        };
        this.onAddBtnClick = this.onAddBtnClick.bind(this);

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
                console.log("error");
                if(e.status != "200") {
                    browserHistory.push('/');
                }
            },
            success: (data) => {
                console.log(data);
                console.log("success");
                this.setState({session_object: data});
                this.populateProjects();
            },
        });
    }

    populateProjects() {
        // TODO: foreach in state session_object, addItem(_title, _key)
    }

    addItem(_title, _key) {
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(<Projects key={_key} title={_title}/>)
        });
    }

    onAddBtnClick(event) {
        // Trigger project creation event
    }

    render() {
        return (
            <div className="Main">
                <div className="Container">
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
