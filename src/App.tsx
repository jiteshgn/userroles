import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Update from './Update';
import Read from './Read';
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './Create';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/read/:id' element={<Read/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
