import { createSlice, nanoid } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ type, message }) {
        const id = nanoid();
        return {
          payload: { id, type, message }
        };
      }
    },
    removeNotification(state, action) {
      return state.filter(n => n.id !== action.payload);
    }
  }
});

export const { addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;