import { FILTER_SEARCH_QUERY } from './actionsTypes';

export function searchFilter(value, list) {
  return { type: FILTER_SEARCH_QUERY, value, list };
}
