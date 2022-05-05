import { createSlice } from '@reduxjs/toolkit';

const initialState = { message: '', timeoutId: null };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      if (state.timeoutId) { clearTimeout(state.timeoutId) };
      return action.payload;
    },
  },
});

export const { displayNotification } = notificationSlice.actions;

export const setNotification = (message, durationInSeconds) => {
  return async dispatch => {
    const timeoutId = setTimeout(() => {
      dispatch(displayNotification(''));
    }, (durationInSeconds * 1000));
    dispatch(displayNotification({ message, timeoutId }));
  }

  // setTimeout returns an integer that can be passed to clearTimeout to cancel the timer
  // the problem is that, when there are multiple changes to the notification state, previous calls to setTimeout will clear subsequent calls that display a new notification.

  // so each call to `setNotification` should clear the timeout set by the last call to setNotification... in order to have access to the id that would make that possible, that ID needs to be part of the application state like so:

  /*
  {
    "anecdotes": [],
    "notification": {
      message: "hey der",
      timeoutId: "213416",
    }
    "filter": ""
  }
  */
}

export default notificationSlice.reducer;