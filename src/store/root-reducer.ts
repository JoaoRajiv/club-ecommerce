import { combineReducers } from "redux";
import cartReducer from "./toolkit/cart/cart.slice";
import categoryReducer from "./toolkit/category/category.slice";
import userReducer from "./toolkit/user/user.slice";

const rootReducer = combineReducers({
	cartReducer,
	userReducer,
	categoryReducer,
});

export default rootReducer;
