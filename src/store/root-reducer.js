import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import categoriesReducer from "./categories/categories.reducer";
import commonReducer from "./common/common.reducer";
import userReducer from "./user/user.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    common: commonReducer,
});