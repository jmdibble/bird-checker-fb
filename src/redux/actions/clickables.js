import {
  INFO_CLICKED_BEGIN,
  INFO_CLICKED_SUCCESS,
  INFO_CLICKED_FAIL
} from './actionsTypes';

export function infoClicked(firebase, birdName) {
  return dispatch => {
    dispatch(infoClickedBegin());
    let imageUrl = '';
    firebase
      .storageRef()
      .child(`/birds/${birdName}.jpg`)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        dispatch(infoClickedSuccess(url));
      });
  };
  // TODO: handle error?
}

export const infoClickedBegin = () => ({
  type: INFO_CLICKED_BEGIN
});

export const infoClickedSuccess = imageUrl => ({
  type: INFO_CLICKED_SUCCESS,
  payload: { imageUrl }
});

export const infoClickedFailure = error => ({
  type: INFO_CLICKED_FAIL,
  payload: { error }
});

//   infoHandler = birdName => {
//     this.setState({ imageLoading: true });
//     this.props.firebase
//       .storageRef()
//       .child(`/birds/${birdName}.jpg`)
//       .getDownloadURL()
//       .then(url => {
//         this.setState({ birdImageUrl: url });
//         this.setState({ dialogTitle: birdName });
//         this.setState({ open: true });
//         this.setState({ imageLoading: false });
//       });
//   };
