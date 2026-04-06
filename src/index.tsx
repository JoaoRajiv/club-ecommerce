import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { Provider } from 'react-redux'
// @ts-ignore
import { PersistGate } from 'redux-persist/integration/react'

import UserContextProvider from './contexts/user.context'
import CategoryContextProvider from './contexts/category.context'
import CartContextProvider from './contexts/cart.context'
import { store, persistedStore } from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <UserContextProvider>
          <CategoryContextProvider>
            <App />
          </CategoryContextProvider>
        </UserContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
