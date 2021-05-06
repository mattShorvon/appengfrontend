import { combineReducers } from "redux";
import { productListReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import { homeReducer } from "./reducers/homeReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Users } from "./reducers/users_reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "home"],
};

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  Users,
  home: homeReducer,
});

export default persistReducer(persistConfig, rootReducer);
