import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';

// Import Materialize CSS
import 'materialize-css/dist/css/materialize.min.css';

import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App/></Provider>, 
    document.querySelector('#root')
);

console.log("Stripe key is: ", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
console.log("Environent is: ", process.env.NODE_ENV);