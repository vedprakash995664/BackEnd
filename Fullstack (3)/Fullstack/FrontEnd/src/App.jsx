import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Component/Home'
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/udashboard' element={<Dashboard/>}/>
    </Routes>
   </Router>
   </>
  )
}

export default App
