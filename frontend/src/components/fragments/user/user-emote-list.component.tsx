import { bind } from 'decko';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import EmoteDropzone from '../emotes/emote-dropzone.component';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// Bootstrap components
import { Modal, Button, Form } from 'react-bootstrap';
import { IAppState, IUser } from 'store/reduxState';

export enum EmoteListStatus {
  pending,
  published,
}

interface IEmoteListProps {
  emoteStatus: EmoteListStatus;
}

interface IReduxEmoteListProps {
  user?: IUser;
  error?: Error;
  authenticated: boolean;
}

type IAllEmoteListProps =
  IEmoteListProps &
  IReduxEmoteListProps;

interface IEmoteListState {
  showModal: boolean;
  editingEmote: any;
}

class EmoteList extends Component<IAllEmoteListProps, IEmoteListState> {
  constructor(props: IAllEmoteListProps) {
    super(props);

    this.state = {
      showModal: false,
      editingEmote: false,
    };
  }

  @bind
  private filterEmotes(): any[] {
    const emotes = this.props.user ? this.props.user.emotes : null;
    const wantedStatus = this.props.emoteStatus;

    const publishedList: any[] = [];
    const otherList: any[] = [];

    if (emotes === null) {
      return otherList;
    }

    emotes.forEach((emote: any) => {
      if (emote.request.status === EmoteListStatus.published) {
        publishedList.push(emote);
      } else {
        otherList.push(emote);
      }
    });

    if (wantedStatus === EmoteListStatus.published) {
      return publishedList;
    }

    return otherList;
  }

  @bind
  private imageFormatter(cell: string, row: any): JSX.Element {
    // TODO: Sanitize image src?
    // TODO: Correct this path to whatever we choose to store the images in.
    return (<img src={cell} />);
  }

  @bind
  private ownerIdFormatter(cell: number, row: any, column: any): JSX.Element {
    if (!this.props.user) {
      throw new Error('User must be signed in');
    }

    if (cell === this.props.user.channelId) {
      const channelLink = 'https://mixer.com/' + this.props.user.username;
      return (<a href={channelLink} target='_blank'>{this.props.user.username}</a>);
    }

    const emotes = this.props.user.emotes;
    const correctEmote = emotes.filter((emote: any) => cell === emote.ownerId);

    const link = 'https://mixer.com/' + correctEmote[0].ownerUsername;
    return (<a href={link} target='_blank'>{correctEmote[0].ownerUsername}</a>);
  }

  @bind
  private openEditModal(row: any): void {
    let { showModal, editingEmote } = this.state;

    showModal = true;
    editingEmote = row;

    this.setState({ showModal, editingEmote });
  }

  @bind
  private closeEditModal(): void {
    let { showModal, editingEmote } = this.state;
    showModal = false;
    editingEmote = false;

    this.setState({ showModal, editingEmote });
  }

  @bind
  private addFile(event: any): void {
    console.log(event.target.files[0]);
  }

  @bind
  private EditEmoteModal(): JSX.Element {
    return (
      <Modal show={this.state.showModal} onHide={this.closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.editingEmote['command']}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formCommand'>
              <Form.Label>Command</Form.Label>
              <Form.Control type='text' placeholder={this.state.editingEmote['command']} />
              <Form.Text className='text-muted'>
                The command people type into chat to display the emote.
                  </Form.Text>
            </Form.Group>

            <Form.Group controlId='formImageUpload'>
              <Form.Label>Update image</Form.Label>
              <Form.Control type='file' onChange={this.addFile} />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button className='modalDelete' variant='danger' onClick={this.closeEditModal}>
            Delete Emote
              </Button>
          <Button variant='secondary' onClick={this.closeEditModal}>
            Close
              </Button>
          <Button variant='primary' onClick={this.closeEditModal}>
            Save Changes
              </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  public render(): JSX.Element {
    const columns = [{
      dataField: 'url',
      text: 'Emote',
      formatter: this.imageFormatter,
      editable: false,
    }, {
      dataField: 'command',
      text: 'Command',
    }, {
      dataField: 'ownerId',
      text: 'Owner',
      editable: false,
      formatter: this.ownerIdFormatter,
    }, {
      dataField: 'meta.channels',
      text: 'Active users',
      editable: false,
    }, {
      dataField: 'modifyButtons',
      isDummyField: true,
      text: '',
      formatter: (cellContent: any, row: any): JSX.Element => {
        if (this.props.user !== undefined && row.ownerUsername === this.props.user.username) {
          return (
            <button onClick={() => this.openEditModal(row)} type='button' className='btn btn-primary' data-toggle='modal' data-target='#editEmoteModal'>
              Edit / Delete
            </button>
          );
        } else {
          return (
            <div></div>
          );
        }
      },
    }];

    return (
      <section>
        <BootstrapTable
          bootstrap4={true}
          wrapperClasses='table-responsive-md'
          keyField='_id'
          data={this.filterEmotes()}
          columns={columns}
        />
        <this.EditEmoteModal></this.EditEmoteModal>
      </section>
    );
  }
}

function mapStateToProps(state: IAppState): IAppState {
  return {
    user: state.user,
    error: state.error,
    authenticated: state.authenticated,
  };
}

export default connect(mapStateToProps)(EmoteList);
