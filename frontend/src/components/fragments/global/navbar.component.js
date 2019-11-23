import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
    componentDidMount() {
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
            throw new Error("Failed to authenticate user");
        })
        .then(responseJson => {
            this.props.dispatch({
                type: "AUTHENTICATED",
                payload: {
                    user: responseJson.user
                }
            });

            // TODO: Remove this before going live!
            console.log(this.props);
        })
        .catch(error => {
            this.props.dispatch({
                type: "NOT_AUTHENTICATED",
                payload: {
                    error: error
                }
            });
        });
    }

    handleNotAuthenticated = () => {
        this.props.dispatch({
            authenticated: false
        })
    };

    loginUser(e) {
        e.preventDefault();
        window.open("http://localhost:5000/api/v1/auth/mixer", "_self");
    }

    logoutUser(e){
        e.preventDefault();
        window.open("http://localhost:5000/logout", "_self");
    }

    render() {
        const { authenticated } = this.props;
        return (
            <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
                <Link to="/" className="navbar-brand">MixrElixr</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Emotes
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <Link to="/emotes/create" className="dropdown-item">Submit emotes</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/emotes/library" className="dropdown-item">Shared library</Link>
                                {
                                    authenticated ?
                                        <Link to="/profile" className="dropdown-item">My emotes</Link>
                                    : ""
                                }
                            </div>
                        </li>                      
                    </ul>
                    <ul className="navbar-nav">
                        {
                            authenticated ?
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="userAvatar"><img src={this.props.user.avatarUrl} /></span>
                                        <span className="username">{this.props.user.username}</span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <Link to="/profile" className="dropdown-item">Profile</Link>
                                        <div className="dropdown-divider"></div>
                                        <a href="#" className="dropdown-item">
                                            <span onClick={this.logoutUser}>Logout</span>
                                        </a>
                                    </div>
                                </li>
                            :   
                                <li className="navbar-item">
                                    <a href="#" className="nav-link">
                                        <span onClick={this.loginUser}>Login</span>
                                    </a>
                                </li>
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        error: state.error,
        authenticated: state.authenticated
    };
}
export default connect(mapStateToProps)(Navbar);