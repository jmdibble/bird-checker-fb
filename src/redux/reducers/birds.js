import {
  GET_BIRDS_BEGIN,
  GET_BIRDS_SUCCESS,
  GET_BIRDS_FAIL
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  birds: [],
  error: {},
  loading: false
};

export default function birds(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BIRDS_BEGIN:
      return {
        ...state,
        loading: true
      };
    case GET_BIRDS_SUCCESS:
      return {
        ...state,
        loading: false,
        birds: action.payload
      };
    case GET_BIRDS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
