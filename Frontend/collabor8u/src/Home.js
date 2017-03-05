import React from "react";
import cookie from "react-cookie";
import $ from "jquery";

class Home extends React.Component {
    constructor(props) {
        super(props);
        let url = "https://collabor8u.herokuapp.com/users/login";
        let accessToken = cookie.load("accessToken");
        this.state = {
            session_object: {},
        };
        var obje = {facebook_access_token: accessToken};
        console.log(JSON.stringify(obje));
        $.ajax({
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            method: 'POST',
            url: url,
            data: JSON.stringify(obje),
        }).done((data) => {
            console.log(data);
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
