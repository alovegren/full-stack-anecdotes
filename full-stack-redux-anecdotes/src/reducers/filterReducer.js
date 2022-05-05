import { createSlice } from '@reduxjs/toolkit';

// do we have access to the anecdote state here, or is an action dispatched to the store to filter collection by 'all' when the app starts?

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  }
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;