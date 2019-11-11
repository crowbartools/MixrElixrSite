import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Homepage extends Component {

    render(){
        return (
            <main role="main">
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">MixrElixr</h1>
                        <p>Fruitcake cake brownie soufflé. Tootsie roll donut caramels cake bonbon cheesecake jelly beans sweet roll macaroon.</p>
                        <p>
                            <Link to="/" className="btn btn-primary btn-lg" role="button">Download</Link>
                        </p>
                    </div>
                </div>

                <div className="container">
                <div className="row">
                    <div className="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p>
                        <Link to="/" className="nav-link btn btn-secondary" role="button">View details &raquo;</Link>
                    </p>
                    </div>
                    <div className="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p>
                        <Link to="/" className="nav-link btn btn-secondary" role="button">View details &raquo;</Link>
                    </p>
                    </div>
                    <div className="col-md-4">
                    <h2>Heading</h2>
                    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                    <p>
                        <Link to="/" className="nav-link btn btn-secondary" role="button">View details &raquo;</Link>
                    </p>
                    </div>
                </div>
                <hr />
                </div>
            </main>
        )
    }

}