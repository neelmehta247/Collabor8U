import React from 'react';
import cookie from 'react-cookie';
import $ from 'jquery';

class Home extends React.Component {
  constructor(props) {
    super(props);
    let url = "https://api.myjson.com/bins/yr75d";
    let accessToken = cookie.load("accessToken");
    this.state = {
      session_object: {},
    };
    console.log(accessToken);
    $.ajax({
      url: url,
      dataType: "json",
    }).done((data) => {
      console.log(data.suh);
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
