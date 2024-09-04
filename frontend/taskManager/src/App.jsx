import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [users, setUsers] = useState([]);
  
  useEffect(() =>{
    fetch("http://localhost:8080/api/users/all")
    .then(res => res.json())
    .then(data => setUsers(data.users));
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>   

      {users.map(user => 

        <>
          <span>Name:</span>
          <span> {user.name}</span>
          <p>Last name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>-------------------------</p>
        </>
        
      )}
    </>
  )
}

export default App
