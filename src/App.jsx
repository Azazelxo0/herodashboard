
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './Pages/Auth'
import DashBoard from './Pages/DashBoard'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
     </Routes>
    </>
  )
}

export default App
