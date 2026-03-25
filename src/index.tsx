import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import UserContextProvider from './contexts/user.context'
import CategoryContextProvider from './contexts/category.context'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <CategoryContextProvider>
        <App />
      </CategoryContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
