import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import HomePage from './pages/home/home.page'

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
