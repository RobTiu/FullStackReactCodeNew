import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Development only axios helpers
import axios from 'axios';
window.axios = axios;



// reduxThunk purpose is to inspect whatever value we return from the action creator.  
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Provider is a react component that knows how to read changes from our redux store anytime that redux store changes state.
// the provider will inform all of its children components that some new state is available and update all of its components
// with the new state
ReactDOM.render(
	<Provider store={store}><App /></Provider>, 
	document.querySelector('#root')
);

// create-react-app module allows us access to environment variables that are defined in .env file.  we can access them
// by using process.env which is the same as the server's way of accessing the host's (i.e. heroku) environment variable
// console.log('STRIPE KEY:', process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is ', process.env.NODE_ENV);
