import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

  const orderAnecdotes = anecdotes => (
  anecdotes.sort((anecdoteA, anecdoteB) => (
    anecdoteB.votes - anecdoteA.votes
  ))
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      const changedAnecdote = action.payload;

      return orderAnecdotes(state.map(anecdote => 
        anecdote.id === id ? changedAnecdote : anecdote
      ));
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    setAnecdotes(_state, action) {
      return action.payload;
    },
  },
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    anecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.update(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  }
}

export default anecdoteSlice.reducer;