import { connect } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const createAnecdote = (event) => {
    event.preventDefault();

    const anecdote = event.target.anecdote.value;
    props.newAnecdote(anecdote);

    event.target.anecdote.value = '';
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  );
}

const ConnectedAnecdoteForm = connect(null, { newAnecdote })(AnecdoteForm);

export default ConnectedAnecdoteForm;