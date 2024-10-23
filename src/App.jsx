import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import ErrorPage from './Pages/Errorpage/Errorpage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' exact element={<Homepage/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
    </>
  )
}

export default App
