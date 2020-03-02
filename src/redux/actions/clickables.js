import {
  INFO_CLICKED_BEGIN,
  INFO_CLICKED_SUCCESS,
  INFO_CLICKED_FAIL
} from './actionsTypes';

export function infoClicked(firebase, birdName) {
  return dispatch => {
    dispatch(infoClickedBegin());
    firebase
      .storageRef()
      .child(`/birds/${birdName}.jpg`)
      .getDownloadURL()
      .then(url => {
        console.log(url, birdName);
        dispatch(infoClickedSuccess(url, birdName));
      });
  };
  // TODO: handle error?
}

export const infoClickedBegin = () => ({
  type: INFO_CLICKED_BEGIN
});

export const infoClickedSuccess = (imageUrl, birdName) => ({
  type: INFO_CLICKED_SUCCESS,
  payload: { imageUrl, birdName }
});

export const infoClickedFailure = error => ({
  type: INFO_CLICKED_FAIL,
  payload: { error }
});
