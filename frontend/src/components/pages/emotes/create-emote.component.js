import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';

import EmoteGuidelines from '../../fragments/emotes/emote-guidelines.component';

export default class CreateEmote extends Component {
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
        return (
            <div className="submission-wrapper">
                <div className="submission-guidelines">
                    <div className="card">
                        <div className="card-header">
                            Submission Guidelines
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                <EmoteGuidelines />
                            </p>
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
                    <Dropzone onDrop={
                            acceptedFiles => console.log(acceptedFiles)
                        }>
                        {({getRootProps, getInputProps}) => (
                            <div>
                                <div className="emote-dropzone card">
                                    <div className="card-body" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p><FontAwesome
                                                className="submission-icon"
                                                name="upload"
                                                size="3x"
                                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                            />
                                        </p>
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                }
            </div>
        )
    }

}