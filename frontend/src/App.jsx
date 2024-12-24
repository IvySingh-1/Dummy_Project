import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './components/home/Home'

import Expense from './components/expense/Expense';
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {

  return (
    <div className='bg'>
    <div>
      <Header/>
      <Home/>
      <About/>
    </div>
    </div>
  )
}

export default App
