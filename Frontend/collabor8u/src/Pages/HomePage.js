import React from "react";
import cookie from "react-cookie";
import {browserHistory} from "react-router";
import $ from "jquery";
import './HomePage.css';
import plus from "../img/plus.png";

class Projects extends React.Component {
    render() {
        return <button className="NewProject" /* onClick={activateLasers} */ >
            Project
        </button>;
    }
}

class HomePage extends React.Component {
    constructor() {
        super();
        let url = "http://collabor8u.heroku.com/users/login";
        let accessToken = cookie.load("accessToken");
        this.state = {
            session_object: {},
            inputList: [],
        };
        this.onAddBtnClick = this.onAddBtnClick.bind(this);

        let obje = {facebook_access_token: accessToken};
        console.log(JSON.stringify(obje));
        $.ajax({
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            method: 'POST',
            url: url,
            data: JSON.stringify(obje),
        }).done((data) => {
            this.setState({session_object: data})
        }).fail(function() {
            browserHistory.push('/');
        });
    }

    populateProjects() {

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
