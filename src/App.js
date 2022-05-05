import { useState } from 'react'

const Button = ({ handler, text }) => (
  <>
    <button onClick={handler}>{text}</button>
  </>
)

const Anecdote = ({ anecdote }) => <p>{anecdote}</p>

const Vote = ({ qty }) => <p>has {qty} votes</p>

const BestAnecdote = ({ anecdote, votes }) => (
  <>
    <Anecdote anecdote={anecdote} />
    <Vote qty={votes} />
  </>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const anecdotesAndVotes = anecdotes.map(anecdote => (
    { anecdote, votes: 0 }
  ));

  const [selected, setSelected] = useState(0);
  const [anecdoteVotes, setAnecdoteVotes] = useState(anecdotesAndVotes);

  const bestAnecdote = anecdoteVotes.slice().sort((a, b) => (
    b.votes - a.votes
  ))[0];

  const handleNewAnecdote = () => {
    const randomIdx = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIdx)
  }

  const handleVote = () => {
    const anecdote = anecdoteVotes[selected];
    const newAnecdote = { ...anecdote, votes: anecdote.votes += 1 };

    const newAnecdotes = anecdoteVotes.slice(0, selected)
      .concat(newAnecdote)
      .concat(anecdoteVotes.slice(selected + 1));

    setAnecdoteVotes(newAnecdotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <Vote qty={anecdoteVotes[selected].votes}/>
      <Button handler={handleVote} text='vote' />
      <Button handler={handleNewAnecdote} text='randomize' />

      <h1>Anecdote with most votes</h1>
      <BestAnecdote anecdote={bestAnecdote.anecdote} votes={bestAnecdote.votes} />
    </div>
  )
}

export default App