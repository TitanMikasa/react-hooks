// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({intialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  console.log('call re-reder')
  // could be a performance bottleneck
  const getIntialName = () => {
    console.log('call getInitialName')
    return localStorage.getItem('name') || intialName
  }
  const [name, setName] = React.useState(getIntialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting intialName={'JB'} />
}

export default App
