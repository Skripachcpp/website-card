export const MODAL_SHOW = 'MODAL_SHOW';
export const MODAL_HIDE = 'MODAL_HIDE';

export const modalShow = (component, fullScreen) => async dispatch => {
  dispatch({ type: MODAL_SHOW, payload: { component, fullScreen } });
};

export const modalHide = () => async dispatch => {
  dispatch({ type: MODAL_HIDE });
};