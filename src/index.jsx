import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { QuizContextProvider } from './components/QuizContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(  
  <QuizContextProvider>
    <Router>
      <App />
    </Router>
  </QuizContextProvider>
)
