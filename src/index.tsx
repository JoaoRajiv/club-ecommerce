import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { Provider } from 'react-redux'

import UserContextProvider from './contexts/user.context'
import CategoryContextProvider from './contexts/category.context'
import CartContextProvider from './contexts/cart.context'
import store from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <CategoryContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </CategoryContextProvider>
      </UserContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
