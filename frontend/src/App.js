import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';

// Component Includes
import Navbar from "./components/global/navbar.component";
import Homepage from "./components/homepage.component";
import Footer from "./components/global/footer.compontent";

import {EmotesView} from "./views/emotes.view";

import User from "./components/user/user.component";

class App extends Component {

  state = {
    user: {},
    error: null,
    authenticated: false
  };

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("http://localhost:5000/api/v1/auth/mixer/success", {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          authenticated: true,
          user: {
            userId: responseJson.userId,
            username: responseJson.username
          }
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }
  
  handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };

  render(){
    const { authenticated } = this.state;
    console.log('Authed: ' + authenticated);
    return (
      <Router>
        <div className="container-fluid">
          <Navbar />
          <br/>
          <Route exact path="/" component={Homepage} />
          <Route path="/emotes/" component={EmotesView} />
          <Route path="/user/" compontent={User} />
          <br/>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
