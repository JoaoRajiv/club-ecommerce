import { combineReducers } from 'redux'
import userReducer from './toolkit/user/user.slice'
import categoryReducer from './reducers/category/category.reducer'
import cartReducer from './toolkit/cart/cart.slice'

const rootReducer = combineReducers({
  cartReducer,
  userReducer,
  categoryReducer
})

export default rootReducer
