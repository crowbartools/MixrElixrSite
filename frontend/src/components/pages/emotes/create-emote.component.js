import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmoteGuidelines from '../../fragments/emotes/emote-guidelines.component';
import EmoteDropzone from '../../fragments/emotes/emote-dropzone.component';

class CreateEmote extends Component {
    constructor(props){
        super(props);

        this.agreedToTerms = this.agreedToTerms.bind(this);

        this.state = {
            agreedToTerms: false
        }
    }

    agreedToTerms(){
        this.setState({
            agreedToTerms: true
        })
    }

    render(){
        const { authenticated } = this.props;

        if(authenticated){
            return (
                <div className="submission-wrapper">
                    <div className="submission-guidelines">
                        <div className="card">
                            <div className="card-header">
                                Submission Guidelines
                            </div>
                            <div className="card-body">
                                <div className="card-text">
                                    <EmoteGuidelines />
                                </div>
                                {
                                    this.state.agreedToTerms ?
                                    <button className="btn btn-success">Thanks!</button>
                                    :
                                    <button className="btn btn-primary" onClick={this.agreedToTerms}>Click to accept.</button>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.agreedToTerms &&
                        <div className="dropzone-area">
                            <div className="card">
                                <div className="card-header">
                                    Uploader
                                </div>
                                <div className="card-body">
                                    <EmoteDropzone />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            );
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
                                    To submit emotes, you'll need to log in! Click the link at the top right of the site to get started!
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
        authenticated: state.authenticated
    };
}
export default connect(mapStateToProps)(CreateEmote);