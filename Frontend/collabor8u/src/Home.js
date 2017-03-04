import React from "react";
import cookie from "react-cookie";
import $ from "jquery";

class Home extends React.Component {
    constructor(props) {
        super(props);
        let url = "http://localhost:5000";
        let accessToken = cookie.load("accessToken");
        this.state = {
            session_object: {},
        };

        $.ajax({
            type: "POST",
            url: url,
            data: '{"facebook_access_token":"' + accessToken + '"}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
        }).done((data) => {
            this.setState({session_object: data})
        });
    }

    render() {
        return (
            <div>
                {this.state.session_object.suh}
            </div>
        );
    }
}

export default Home;
