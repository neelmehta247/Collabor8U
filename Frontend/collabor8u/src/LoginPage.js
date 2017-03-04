import React from 'react';
import './LoginPage.css';
import logo from './logo.svg';

class LoginPage extends React.Component{
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
            </div>
          </div>
        </div> 
      </div>
    );
  }
  
}

export default LoginPage;
