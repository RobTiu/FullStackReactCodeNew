import { FETCH_SURVEYS } from '../actions/types';

// state is [] since we are going to get a list of surveys compared to null in the authreducer.js
export default function(state = [], action) {
  // console.log(action);
  switch (action.type) {
    case FETCH_SURVEYS: 
      return action.payload; // the user model response.  "" evaluates to false so return false when action.payload == ""
    default:
      // no clue if the user is logged in
      return state;
  }
}