import { createSlice } from '@reduxjs/toolkit';
import { addNotification } from '../notifications/notificationsSlice';

let intervalId = null;

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    seconds: 0,
    isRunning: false,
  },
  reducers: {
    startTimer: (state) => {
      if (!state.isRunning) {
        state.isRunning = true;
      }
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.seconds = 0;
      state.isRunning = false;
    },
    increment: (state) => {
      state.seconds += 1;
    },
  },
});

export const { startTimer, stopTimer, resetTimer, increment } = timerSlice.actions;

export const startTimerWithInterval = () => (dispatch, getState) => {
  const { isRunning } = getState().timer;
  if (isRunning) return;

  dispatch(startTimer());

  intervalId = setInterval(() => {
    const { isRunning, seconds } = getState().timer;
    if (!isRunning) {
      clearInterval(intervalId);
      return;
    }

    dispatch(increment());

    if (seconds + 1 === 10) {
      dispatch(addNotification({ type: 'info', message: '10 soniya o‘tdi!' }));
    }
  }, 1000);
};

export const stopTimerWithInterval = () => (dispatch) => {
  clearInterval(intervalId);
  dispatch(stopTimer());
};

export default timerSlice.reducer;
