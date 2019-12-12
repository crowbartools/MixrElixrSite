import { bind } from 'decko';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Bootstrap components
import { Card } from 'react-bootstrap';

import EmoteGuidelines from '../../fragments/emotes/emote-guidelines.component';
import EmoteDropzone from '../../fragments/emotes/emote-dropzone.component';

import { IAppState, IUser } from 'store/reduxState';

interface ICreateEmoteProps {
  user?: IUser;
  error?: Error;
  authenticated: boolean;
}

type IAllCreateEmoteProps =
  ICreateEmoteProps;

class CreateEmote extends Component<IAllCreateEmoteProps, any> {
  constructor(props: IAllCreateEmoteProps) {
    super(props);

    this.state = {
      agreedToTerms: false,
    };
  }

  @bind
  private agreedToTerms(): void {
    this.setState({
      agreedToTerms: true,
    });
  }

  public render(): JSX.Element {
    const { authenticated } = this.props;

    if (authenticated) {
      return (
        <div className='submission-wrapper'>
          <div className='submission-guidelines'>
            <Card>
              <Card.Body>
                <Card.Title>
                  Submission Guidelines
                </Card.Title>
                <Card.Text>
                  <div className='emote-guidelines-wrap'>
                    <EmoteGuidelines />
                  </div>
                  {
                    this.state.agreedToTerms ?
                      <button className='btn btn-success'>Thanks!</button>
                      :
                      <button className='btn btn-primary' onClick={this.agreedToTerms}>Click to accept.</button>
                  }
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          {
            this.state.agreedToTerms &&
            <div className='dropzone-area'>
              <Card>
                <Card.Body>
                  <Card.Title>
                    Uploader
                  </Card.Title>
                  <Card.Text>
                    <div className='dropzone-wrap'>
                      <EmoteDropzone />
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          }
        </div>
      );
    } else {
      return (
        <div className='submission-wrapper'>
          <div className='submission-login'>
            <Card>
              <Card.Body>
                <Card.Title>
                  Oops!
                </Card.Title>
                <Card.Text>
                  To submit emotes, you'll need to log in! Click the link at the top right of the site to get started!
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state: IAppState): ICreateEmoteProps {
  return {
    user: state.user,
    error: state.error,
    authenticated: state.authenticated,
  };
}

export default connect(mapStateToProps)(CreateEmote);
