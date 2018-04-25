import { combineReducers } from 'redux';
import modal from './modal';
import keyboard from './keyboard';

const rootReducer = combineReducers({
  modal,
  keyboard
});

export default rootReducer;