import { FILTER_SEARCH_QUERY } from '../actions/actionsTypes';

const INITIAL_STATE = {
  filteredList: []
};

export default function filters(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FILTER_SEARCH_QUERY:
      const filteredList = action.list.filter(item => {
        const lc = item.name.toLowerCase();
        const value = action.value.toLowerCase();
        return lc.includes(value);
      });
      return { filteredList };
    default:
      return state;
  }
}
