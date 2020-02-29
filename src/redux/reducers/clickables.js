import {
  INFO_CLICKED_BEGIN,
  INFO_CLICKED_SUCCESS,
  INFO_CLICKED_FAIL
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  error: {},
  loading: false,
  birdImageUrl: ''
};

export default function info(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INFO_CLICKED_BEGIN:
      return {
        ...state,
        loading: true
      };
    case INFO_CLICKED_SUCCESS:
      return {
        ...state,
        loading: false,
        birdImageUrl: action.payload.imageUrl
      };
    case INFO_CLICKED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
