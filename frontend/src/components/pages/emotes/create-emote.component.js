import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EmoteGuidelines from '../../fragments/emotes/emote-guidelines.component';
import EmoteSubmitForm from '../../fragments/emotes/emote-submit-form.component';

export default class CreateEmote extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
                <div className="submission-guidelines">
                    <div className="card">
                        <div className="card-header">
                            Submission Guidelines
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                <EmoteGuidelines />
                            </p>
                            <a href="#" className="btn btn-primary">I accept the guidelines.</a>
                        </div>
                    </div>
                </div>
                <div className="submission-form">
                    <EmoteSubmitForm />
                </div>
            </div>
        )
    }

}