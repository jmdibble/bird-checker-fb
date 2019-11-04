import initialState from './initialState';
import { FETCH_ALLBIRDS, RECEIVE_ALLBIRDS } from '../actions/actionsTypes';

export default function allBirds(state = initialState.allBirds, action) {
  let newState;
  switch (action.type) {
    case FETCH_ALLBIRDS:
      console.log('FETCH_ALLBIRDS Action');
      return action;
    case RECEIVE_ALLBIRDS:
      newState = action.stuff;
      console.log('RECEIVE_ALLBIRDS Action');
      return newState;
    default:
      return state;
  }
}
