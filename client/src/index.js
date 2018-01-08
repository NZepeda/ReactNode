import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

// Import Materialize CSS
import 'materialize-css/dist/css/materialize.min.css';

const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}><App/></Provider>, 
    document.querySelector('#root')
);