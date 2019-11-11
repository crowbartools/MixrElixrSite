import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

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
                throw new Error("Failed to authenticate user");
            })
            .then(responseJson => {
                this.props.dispatch({
                    type: "AUTHENTICATED",
                    payload: {
                        user: responseJson.user
                    }
                });
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
                        {
                            authenticated
                            ?   <div className="navbar-item">
                                    <Link to="/logout" className="nav-link">
                                        <span onClick={this.logoutUser}>Logout</span>
                                    </Link>
                                </div>
                            :   <li className="navbar-item">
                                    <Link to="/login" className="nav-link">
                                        <span onClick={this.loginUser}>Login</span>
                                    </Link>
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