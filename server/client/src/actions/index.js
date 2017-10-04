import axios from 'axios';
import { FETCH_USER } from './types';

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