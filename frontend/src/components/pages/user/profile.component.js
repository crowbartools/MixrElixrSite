import React, { Component } from 'react';
import { connect } from 'react-redux';

// Bootstrap components
import {Row, Col, Card} from 'react-bootstrap';

import EmoteList from '../../fragments/user/user-emote-list.component';

class Profile extends Component {
    constructor(props){
        super(props);

    }

    render(){
        const { authenticated } = this.props;

        if(authenticated){
            return (
                <Row>
                    <Col lg={9} className="profile-content">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    Pending Emotes
                                </Card.Title>
                                <div className="card-text">
                                    <EmoteList emoteStatus="pending"/>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                Live Emotes
                                </Card.Title>
                                <div className="card-text">
                                    <EmoteList emoteStatus="published"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={3} className="profile-sidebar">
                        This will be the sidebar. Over here we'll show information such as user level, account creation date, and maybe in the future options to add editors and such.
                    </Col>
                </Row>
            )
        } else {
            return (
                <Row>
                    <div className="submission-wrapper">
                        <div className="submission-login">
                            <div className="card">
                                <div className="card-header">
                                    Oops!
                                </div>
                                <div className="card-body">
                                    <div className="card-text">
                                        To see your profile, you'll need to log in! Click the link at the top right of the site to get started!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        error: state.error,
        authenticated: state.authenticated,
        system: state.system
    };
}
export default connect(mapStateToProps)(Profile);