import { useState } from 'react'
import './App.css'
import HuzurVakti from './components/HuzurVakti'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HuzurVakti />
    </>
  )
}

export default App
