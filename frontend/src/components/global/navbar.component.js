import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            authenticated: false,
            userId: false
        }
    }

    loginUser(e){
        e.preventDefault();
        window.open("http://localhost:5000/api/v1/auth/mixer", "_self");
    }

    render(){
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">MixrElixr</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/emotes" className="nav-link">Emotes</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Profile</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">
                                <span onClick={this.loginUser}>Login</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

}