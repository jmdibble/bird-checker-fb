import * as types from './actionTypes';

export function receiveAllBirds(data) {
  return { type: allActions.RECEIVE_ALLBIRDS, allBirds: data };
}

export function fetchAllBirds() {
  return dispatch => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response =>
        response.json().then(data => ({
          data: data,
          status: response.status
        }))
      )
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveStuff(response.data));
        } else {
          var flash = {
            type: 'error',
            title: 'Error getting task list',
            content:
              'There was an error getting the task list. Please try again.'
          };
          dispatch({ type: 'DISPLAY_FLASH', data: flash });
        }
      });
  };
}
