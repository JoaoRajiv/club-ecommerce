import { combineReducers } from 'redux'
import userReducer from './reducers/user/user.reducer'
import cartReducer from './reducers/cart/cart.reducer'

const rootReducer = combineReducers({
  cartReducer,
  userReducer
})

export default rootReducer
