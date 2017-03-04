import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import './App.css'

class Login extends React.Component{

  responseFacebook (response) {
    let accessToken = response.accessToken;
    // Route to next file with accessToken as parameter and get JSON data
    //   from backend on next page
    //   this.props.router.push('/some/path')
    // return $.getJSON(url)
    //   .then((data) => {
    //     this.setState({ session_object: data.results });
    //   });
    this.props.router.push('/home/' + accessToken)
  }

  render () {
    return (
      <div>
        <FacebookLogin socialId="205597079920458"
                       language="en_US"
                       scope="public_profile,email"
                       responseHandler={this.responseFacebook}
                       xfbml={true}
                       version="v2.8"
                       class="facebook-login"
                       buttonText="Login with Facebook"/>
      </div>
    );
  }

}

export default Login;
