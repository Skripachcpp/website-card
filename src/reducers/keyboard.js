import {
  KEY_DOWN
} from 'actions/keyboard';

const initialState = {
};

const keyboard = (state = initialState, action) => {
  switch (action.type) {
    case KEY_DOWN:
      return {...action.payload};
    default:
      return state;
  }
};

export default keyboard;