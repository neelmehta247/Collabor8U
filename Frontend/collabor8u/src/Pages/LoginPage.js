import React from "react";
import {browserHistory} from "react-router";
import {FacebookLogin} from "react-facebook-login-component";
import cookie from "react-cookie";
import "./LoginPage.css";
import logo from "../logo.svg";
import ".././Notes.css";


class LoginPage extends React.Component {
    responseFacebook(response) {
        let accessToken = response.accessToken;
        cookie.save("accessToken", accessToken);
        browserHistory.push('/home/');
    }

    render() {
        return (

            <div className="Main">
                <div className="App">
                </div>

                <div className="LoginContainer">
                    <div className="LoginForm">
                        <div className="Logo">
                            <img src={logo} className="AppLogo" alt="logo"/>
                        </div>
                        <div className="LoginButton">
                            <FacebookLogin socialId="205597079920458"
                                           language="en_US"
                                           scope="public_profile,email"
                                           responseHandler={this.responseFacebook}
                                           xfbml={true}
                                           version="v2.8"
                                           class="facebook-login"
                                           buttonText="Login with Facebook"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default LoginPage;
// export default Notes;
