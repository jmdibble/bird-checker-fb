import { combineReducers } from 'redux';
import allBirds from './allBirdsReducer';

const rootReducer = combineReducers({
  allBirds
});

export default rootReducer;
