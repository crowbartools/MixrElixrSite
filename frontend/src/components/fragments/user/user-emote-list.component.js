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

    beforeSaveCell(oldValue, newValue, row, column, done) {
        setTimeout(() => {
          if (window.confirm('Are you sure you want to make this change?')) {
            // TODO: Push change to backend to update database.
            console.log(row);
            done(true);
          } else {
            done(false);
          }
        }, 0);
        return { async: true };
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

    render() {
        const columns = [{
            dataField: 'url',
            text: 'Url',
            formatter: this.imageFormatter,
            editable: false
          }, {
            dataField: 'command',
            text: 'Commands'
          }, {
            dataField: 'ownerId',
            text: 'Owner',
            editable: false,
            formatter: this.ownerIdFormatter
          }, {
            dataField: 'meta.channels',
            text: 'Channels',
            editable: false
          }];
          
          const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            clickToEdit: true  // Click to edit cell also
          };
          
          const beforeSaveCell = this.beforeSaveCell;

        return (
            <BootstrapTable
                bootstrap4={ true }
                keyField="_id"
                data={ this.filterEmotes() }
                columns={ columns }
                selectRow={ selectRow }
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    beforeSaveCell
                  })}
            />
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
export default connect(mapStateToProps)(EmoteList);