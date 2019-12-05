import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmoteList from '../../fragments/user/user-emote-list.component';

class Profile extends Component {
    constructor(props){
        super(props);

    }

    render(){
        const { authenticated } = this.props;

        if(authenticated){
            return (
                <div className="row">
                    <div className="col-9 profile-content">
                        
                        <div className="card">
                            <div className="card-header">
                                Pending Emotes
                            </div>
                            <div className="card-body">
                                <div className="card-text">
                                    <EmoteList emoteStatus="pending"/>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                Live Emotes
                            </div>
                            <div className="card-body">
                                <div className="card-text">
                                    <EmoteList emoteStatus="published"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 profile-sidebar">
                        This will be the sidebar. Over here we'll show information such as user level, account creation date, and maybe in the future options to add editors and such.
                    </div>
                </div>
            )
        } else {
            return (
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