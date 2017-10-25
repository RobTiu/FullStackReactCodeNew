import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// WHEN CREATING NEW REDUX OPERATION, START WITH ACTIONS.  CREATE THE TYPE AND then export the action
// THEN ADD CREATE A REDUCER AND ADD IT TO reducers/INDEX.JS.  

// fetch user is a function 
// () empty argument
// dispatch => is a function that has an argument called dispatch
// async is to replace promises

export const fetchUser = () => async (dispatch) => {
	// first action creator
	// relative path to the backend user.  use axios to proxy to the backend route.
	// await waits for the ajax request to finish before we can dispatch 
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });

	// the promise version
	/*
		axios
			.get('/api/current_user')
			.then(res => dispatch({ type: FETCH_USER, payload: res }));
	*/
};

export const handleToken = token => async dispatch => {
	// console.log('token', token);
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	// redirect to surveys home
	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');


	// res.data will contain ALL THE SURVEYS from surveysRoutes get(/api/surveys) call
	dispatch({type: FETCH_SURVEYS, payload: res.data });
};