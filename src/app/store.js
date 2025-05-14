import { configureStore } from '@reduxjs/toolkit';
import debtsReducer from '../features/debts/debtsSlice';
import timerReducer from '../features/timer/timerSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';

export const store = configureStore({
  reducer: {
    debts: debtsReducer,
    timer: timerReducer,
    notifications: notificationsReducer
  }
});
