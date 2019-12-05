import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class EmoteList extends Component {
    constructor(props){
        super(props);

        this.filterEmotes = this.filterEmotes.bind(this);
        this.ownerIdFormatter = this.ownerIdFormatter.bind(this);
        this.setEditModalEmote = this.setEditModalEmote.bind(this);
    }

    filterEmotes(){
        const emotes = this.props.user.emotes;
        const wantedStatus = this.props.emoteStatus;

        let publishedList = [];
        let otherList = [];

        if(emotes == null){
            return otherList;
        }

        emotes.forEach(emote => {
            if(emote.request.status === "published"){
                publishedList.push(emote);
            } else {
                otherList.push(emote);
            }
        });

        if(wantedStatus === "published"){
            return publishedList;
        }

        return otherList;
    }

    imageFormatter(cell, row){
        // TODO: Sanitize image src?
        // TODO: Correct this path to whatever we choose to store the images in.
        return (<img src={cell}/>);
    }

    ownerIdFormatter(cell, row, column){
        if(cell == this.props.user.channelId){
            let link = "https://mixer.com/" + this.props.user.username;
            return (<a href={link} target="_blank">{this.props.user.username}</a>);
        }

        let emotes = this.props.user.emotes;
        let correctEmote = emotes.filter(emote => cell === emote.ownerId);

        let link = "https://mixer.com/" + correctEmote[0].ownerUsername;
        return (<a href={link} target="_blank">{correctEmote[0].ownerUsername}</a>);
    }   

    setEditModalEmote(row){
      this.props.dispatch({
          type: "USER_EMOTES_UPDATE_EDITED",
          payload: {
              editingEmote: row
          }
      });

      console.log(this.props);
    }

    render() {
        const columns = [{
            dataField: 'url',
            text: 'Emote',
            formatter: this.imageFormatter,
            editable: false
          }, {
            dataField: 'command',
            text: 'Command'
          }, {
            dataField: 'ownerId',
            text: 'Owner',
            editable: false,
            formatter: this.ownerIdFormatter
          }, {
            dataField: 'meta.channels',
            text: 'Active users',
            editable: false
          }, {
            dataField: 'modifyButtons',
            isDummyField: true,
            text: '',
            formatter: (cellContent, row) => {
              if(row.ownerUsername === this.props.user.username){
                return (
                  <button onClick={() => this.setEditModalEmote(row)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#editEmoteModal">
                    Edit / Delete
                  </button>
                );
              } else {
                return (
                  <div></div>
                );
              }
            }
          }];

        return (
          <BootstrapTable
            bootstrap4={ true }
            wrapperClasses="table-responsive-md"
            keyField="_id"
            data={ this.filterEmotes() }
            columns={ columns }
          />
        )
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
export default connect(mapStateToProps)(EmoteList);