import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'jquery';
import 'popper.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import './css/App.css';

// Component Includes
import Navbar from "./components/global/navbar.component";
import Homepage from "./components/homepage.component";
import Footer from "./components/global/footer.compontent";
import User from "./components/user/user.component";

// Views
import { EmotesView } from "./views/emotes.view";

// Redux State
import reducer from "./store/reduxState";
const elixrStore = createStore(reducer);

// App
class App extends Component {
  render() {
    return (
      <Provider store={elixrStore}>
        <Router>
          <div className="container-fluid">
            <Navbar />
            <br />
            <Route exact path="/" component={Homepage} />
            <Route path="/emotes/" component={EmotesView} />
            <Route path="/user/" compontent={User} />
            <br />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
