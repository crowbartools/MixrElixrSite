import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';

import Navbar from "./components/global/navbar.component";
import Homepage from "./components/homepage.component";
import Emotes from "./components/emotes/emotes.component";
import Emote from "./components/emotes/emote.component";
import User from "./components/user/user.component";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar />
        <br/>
        <Route path="/" exact component={Homepage} />
        <Route path="/emotes" component={Emotes} />
        <Route path="/emote/:id" compontent={Emote} />
        <Route path="/user" compontent={User} />
      </div>
    </Router>
  );
}

export default App;
