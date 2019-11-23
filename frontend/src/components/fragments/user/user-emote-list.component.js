import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class EmoteList extends Component {
    constructor(props){
        super(props);

        this.filterEmotes = this.filterEmotes.bind(this);
    }

    filterEmotes(){
        const emotes = this.props.user.emotes;
        const wantedStatus = this.props.emoteStatus;

        let publishedList = [];
        let otherList = [];

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

    render() {
        const columns = [{
            dataField: 'url',
            text: 'Url'
          }, {
            dataField: 'command',
            text: 'Commands'
          }, {
            dataField: 'ownerId',
            text: 'Owner ID'
          }, {
            dataField: 'meta.channels',
            text: 'Channels'
          }];
          
          const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            clickToEdit: true  // Click to edit cell also
          };
          
          const cellEdit = {
            mode: 'click'
          };

        return (
            <BootstrapTable
                bootstrap4={true}
                keyField="_id"
                data={ this.filterEmotes() }
                columns={ columns }
                selectRow={ selectRow }
                cellEdit={ cellEditFactory({ mode: 'click' }) }
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