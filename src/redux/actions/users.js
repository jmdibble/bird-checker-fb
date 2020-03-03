import {
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL
} from './actionsTypes';

export function getUsers(firebase, authUser) {
  return dispatch => {
    dispatch(getUsersBegin());
    let seenBirds = [];
    console.log(authUser.uid);

    firebase.user(authUser.uid).onSnapshot(snapshot => {
      seenBirds = snapshot.data().birds;
      console.log(seenBirds);
    });

    // TODO: handle error?
  };
}

export const getUsersBegin = () => ({
  type: GET_USERS_BEGIN
});

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: { users }
});

export const getUsersFailure = error => ({
  type: GET_USERS_FAIL,
  payload: { error }
});
