import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Intro from './pages/Intro'
import Quiz from './pages/Quiz'

export default function App() {
  return (
    <main>
      <Routes>
        <Route 
          exact
          path="/"
          element={<Intro />}
        />
        <Route 
          path="/quiz"
          element={<Quiz />}
        />
      </Routes>
    </main>
  )
}
