import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CreateEmotes extends Component {
    constructor(props){
        super(props);

        this.onChangeEmoteImage = this.onChangeEmoteImage.bind(this);
        this.onChangeEmoteSize = this.onChangeEmoteSize.bind(this);
        this.onChangeEmoteCommand = this.onChangeEmoteCommand.bind(this);
        this.onChangeEmoteShared = this.onChangeEmoteShared.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            emoteImage: "",
            emoteSize: "",
            emoteCommand: "",
            emoteShared: ""
        }
    }

    onChangeEmoteImage(e) {
        this.setState({
            emoteImage: e.target.value
        })
    }

    onChangeEmoteSize(e) {
        this.setState({
            emoteSize: e.target.value
        })
    }

    onChangeEmoteCommand(e) {
        this.setState({
            emoteCommand: e.target.value
        })
    }

    onChangeEmoteShared(e) {
        this.setState({
            emoteShared: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const emote = {
            emoteImage: this.state.emoteImage,
            emoteSize: this.state.emoteSize,
            emoteCommand: this.state.emoteCommand,
            emoteShared: this.state.emoteShared
        }

        console.log(emote);

        window.location = '/';
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="emotePreview">Emote</div>
                    <div className="form-group">
                        <label for="emoteCommand">Emote Name</label>
                        <input type="text" required className="form-control" id="emoteCommand" placeholder="Pog" onChange={this.onChangeEmoteCommand} value={this.state.emoteCommand}/>
                    </div>
                    <div className="form-group">
                        <label for="emoteSize">Emote Size</label>
                        <select required className="form-control" id="emoteSize" onChange={this.onChangeEmoteSize} selected={this.state.emoteSize}>
                            <option value="24">24x24</option>
                            <option value="30">30x30</option>
                            <option value="50">50x50</option>
                        </select>
                    </div>
                    <div Name="form-group">
                        <label for="emoteShared">Emote Shared</label>
                        <select required className="form-control" id="emoteShared" onChange={this.onChangeEmoteShared} selected={this.state.emoteShared}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="emoteUpload">Emote Upload</label>
                        <input required type="file" className="form-control-file" id="emoteUpload" onChange={this.onChangeEmoteImage} value={this.state.emoteImage}/>
                    </div>
                </form>
            </div>
        )
    }

}