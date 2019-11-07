import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';

// Component Includes
import Navbar from "./components/global/navbar.component";
import Homepage from "./components/homepage.component";

import {EmotesView} from "./views/emotes.view";

import User from "./components/user/user.component";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar />
        <br/>
        <Route exact path="/" exact component={Homepage} />
        <Route path="/emotes/" component={EmotesView} />
        <Route path="/user/" compontent={User} />
      </div>
    </Router>
  );
}

export default App;
