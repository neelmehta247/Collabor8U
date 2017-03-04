import React from 'react';
import {Link, Router, Route, browserHistory} from "react-router";
import { FacebookLogin } from 'react-facebook-login-component';
import cookie from 'react-cookie';
import './LoginPage.css';
import './App.css';
import logo from './logo.svg';


class LoginPage extends React.Component{
  responseFacebook (response) {
    let accessToken = response.accessToken;
    // Route to next file with accessToken as parameter and get JSON data
    //   from backend on next page
    //   this.props.router.push('/some/path')
    // return $.getJSON(url)
    //   .then((data) => {
    //     this.setState({ session_object: data.results });
    //   });
    cookie.save("accessToken", accessToken);
    browserHistory.push('/home');
  }

  render() {
    return (

      <div className="Main">
        <div className="App">
        </div>

        <div className="LoginContainer">
          <div className="LoginForm">
            <div className="Logo">
              <img src={logo} className="AppLogo" alt="logo" />
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
