import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import catalogReducer from "./catalogSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
    reducer:{auth: authReducer, catalog: catalogReducer , cart: cartReducer, order: orderReducer}
});

export default store;