import {
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  users: [],
  seenBirds: [],
  error: {},
  loading: false
};

export default function birds(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USERS_BEGIN:
      return {
        ...state,
        loading: true
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        seenBirds: action.payload
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
