export const KEY_DOWN = 'KEY_DOWN';

export const keyDown = (keyCode) => async dispatch => {
  dispatch({ type: KEY_DOWN, payload: {keyCode} });
};