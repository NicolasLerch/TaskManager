import './App.css'
import './Components/LoginForm/LoginForm.jsx'
import{ Link} from 'react-router-dom'

function App() {
  return (
    <>    
      <h1>WELCOME TO TASK MANAGER</h1>
      <Link to="/login">Login</Link>
    </>
  )
}

export default App