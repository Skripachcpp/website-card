import {
  MODAL_SHOW,
  MODAL_HIDE,
} from 'actions/modal';

const initialState = {
  open: false
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return { ...state, open: true, ...action.payload };
    case MODAL_HIDE:
      return initialState;

    default:
      return state;
  }
};

export default modal;