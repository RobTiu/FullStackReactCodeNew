import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
	// console.log(action);
	switch (action.type) {
		case FETCH_USER: 
			return action.payload || false; // the user model response.  "" evaluates to false so return false when action.payload == ""
		default:
			// no clue if the user is logged in
			return state;
	}
}