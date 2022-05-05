import { useSelector, useDispatch } from 'react-redux';

import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => {
      return anecdote.content.includes(state.filter)
    });
  });

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
  }

  const notify = (message) => {
    dispatch(setNotification(message, 5));
  }

  return (
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          {anecdote.content} has {anecdote.votes}
          <button onClick={() => {
            vote(anecdote);
            notify(`You voted for ${anecdote.content}`);
          }}>vote</button>
        </li>
      ))}
    </ul>
  );
}

export default AnecdoteList;