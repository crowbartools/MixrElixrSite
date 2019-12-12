import { bind } from 'decko';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';

// Bootstrap components
import Container from 'react-bootstrap/Container';

// CSS and JS
import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import './css/App.css';

// Component Includes
import Navbar from './components/fragments/global/navbar.component';
import Footer from './components/fragments/global/footer.compontent';
import Homepage from './components/pages/misc/homepage.component';
import About from './components/pages/misc/about.component';
import Profile from './components/pages/user/profile.component';

import { IAppState, IUser } from 'store/reduxState';

// Views
import { EmotesView } from './views/emotes.view';

interface IAppProps {
  user?: IUser;
  error?: Error;
  authenticated: boolean;
}

type IAllAppProps =
  IAppProps &
  DispatchProp;

// App
class App extends Component<IAllAppProps, {}> {
  public componentDidMount(): void {
    this.loadData();
  }

  public render(): JSX.Element {
    return (
      <Router>
        <Container fluid={true} className='header p-0 m-0'>
          <Navbar />
        </Container>
        <Container className='content-body'>
          <Route exact path='/' component={Homepage} />
          <Route path='/about/' component={About} />
          <Route path='/profile/' component={Profile} />
          <Route path='/emotes/' component={EmotesView} />
        </Container>
        <Container className='container-fluid footer'>
          <Footer />
        </Container>
      </Router>
    );
  }

  @bind
  private async loadData(): Promise<void> {
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/mixer/success', {
        method: 'GET',
        credentials: 'include',
        headers: [
          ['Accept', 'application/json'],
          ['Content-Type', 'application/json'],
          ['Access-Control-Allow-Credentials', 'true'],
        ],
      });

      if (response.status === 200) {
        const responseJson: any = await response.json();
        this.props.dispatch({
          type: 'AUTHENTICATED',
          payload: {
            user: responseJson.user,
          },
        });

        // TODO: Remove this before going live!
        console.log(this.props);
      } else {
        throw new Error('Failed to authenticate user');
      }

    } catch (error) {
      this.props.dispatch({
        type: 'NOT_AUTHENTICATED',
        payload: {
          error,
        },
      });
    }
  }
}

function mapStateToProps(state: IAppState): IAppProps {
  return {
    user: state.user,
    error: state.error,
    authenticated: state.authenticated,
  };
}
export default connect(mapStateToProps)(App);
