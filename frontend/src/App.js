import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'jquery';
import 'popper.js';
import "bootstrap/dist/js/bootstrap.min.js";

import "font-awesome/css/font-awesome.min.css";
import "bootswatch/dist/darkly/bootstrap.min.css";
import './css/App.css';

// Component Includes
import Navbar from "./components/fragments/global/navbar.component";
import Footer from "./components/fragments/global/footer.compontent";
import Homepage from "./components/pages/misc/homepage.component";
import About from "./components/pages/misc/about.component";
import Profile from "./components/pages/user/profile.component";

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
          <div className="container-fluid header p-0 m-0">
            <Navbar />
          </div>
          <div className="container content-body">
            <Route exact path="/" component={Homepage} />
            <Route path="/about/" component={About} />
            <Route path="/profile/" component={Profile} />
            <Route path="/emotes/" component={EmotesView} />
          </div>
          <div className="container-fluid footer">
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
