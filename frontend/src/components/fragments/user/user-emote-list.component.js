import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import EmoteDropzone from '../../fragments/emotes/emote-dropzone.component';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// Bootstrap components
import {Modal, Button, Form} from 'react-bootstrap';

class EmoteList extends Component {
    constructor(props){
        super(props);

        this.state = {
          showModal: false,
          editingEmote: false
        };

        this.filterEmotes = this.filterEmotes.bind(this);
        this.ownerIdFormatter = this.ownerIdFormatter.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.EditEmoteModal = this.EditEmoteModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
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

    openEditModal(row){
      let {showModal, editingEmote} = this.state;
      showModal = true;
      editingEmote = row;

      this.setState({showModal, editingEmote});
    }

    closeEditModal(){
      let {showModal, editingEmote} = this.state;
      showModal = false;
      editingEmote = false;

      this.setState({showModal, editingEmote});
    }

    addFile(event){
      console.log(event.target.files[0]);
    }

    EditEmoteModal() {
      return (
          <Modal show={this.state.showModal} onHide={this.closeEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.editingEmote['command']}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCommand">
                  <Form.Label>Command</Form.Label>
                  <Form.Control type="text" placeholder={this.state.editingEmote['command']} />
                  <Form.Text className="text-muted">
                    The command people type into chat to display the emote.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formImageUpload">
                    <Form.Label>Update image</Form.Label>
                    <Form.Control type="file" onChange={this.addFile}/>
                </Form.Group>
              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button className="modalDelete" variant="danger" onClick={this.closeEditModal}>
                Delete Emote
              </Button>
              <Button variant="secondary" onClick={this.closeEditModal}>
                Close
              </Button>
              <Button variant="primary" onClick={this.closeEditModal}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
      );
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
                  <button onClick={() => this.openEditModal(row)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#editEmoteModal">
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
          <section>
            <BootstrapTable
              bootstrap4={ true }
              wrapperClasses="table-responsive-md"
              keyField="_id"
              data={ this.filterEmotes() }
              columns={ columns }
            />
            <this.EditEmoteModal></this.EditEmoteModal>
          </section>
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