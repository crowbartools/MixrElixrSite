import React, { Component } from 'react';

export default class Footer extends Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <footer className='mastfoot mt-auto'>
        <div className='inner'>
          <p>Site footer goes here.</p>
        </div>
      </footer>
    );
  }
}
