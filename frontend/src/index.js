import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider} from 'react-redux';

// Redux State
import reducer from "./store/reduxState";
const elixrStore = createStore(reducer);

ReactDOM.render(
    <Provider store={elixrStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);

