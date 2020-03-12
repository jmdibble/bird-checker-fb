import {
  GET_BIRDS_BEGIN,
  GET_BIRDS_SUCCESS,
  GET_BIRDS_FAIL
} from './actionsTypes';

export function getBirds(firebase) {
  return dispatch => {
    dispatch(getBirdsBegin());
    let allBirds = [];
    firebase.birds().onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, doc.data());
        allBirds.push({ name: doc.data().name, uid: doc.id });
      });
      allBirds.sort((a, b) => a.name.localeCompare(b.name));
      console.log(allBirds);
      dispatch(getBirdsSuccess(allBirds));
    });
    // TODO: handle error?
  };
}

export const getBirdsBegin = () => ({
  type: GET_BIRDS_BEGIN
});

export const getBirdsSuccess = birds => ({
  type: GET_BIRDS_SUCCESS,
  payload: { birds }
});

export const getBirdsFailure = error => ({
  type: GET_BIRDS_FAIL,
  payload: { error }
});
