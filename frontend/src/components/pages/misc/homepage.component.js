import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Bootstrap components
import {Jumbotron} from 'react-bootstrap';

export default class Homepage extends Component {

    render(){
        return (
            <main role="main">
                <Jumbotron>
                    <h1 className="display-3">
                        MixrElixr
                    </h1>
                    <p>
                        Fruitcake cake brownie soufflé. Tootsie roll donut caramels cake bonbon cheesecake jelly beans sweet roll macaroon.
                    </p>
                    <p>
                        <Link to="/" className="btn btn-primary btn-lg" role="button">Download</Link>
                    </p>
                </Jumbotron>
            </main>
        )
    }

}