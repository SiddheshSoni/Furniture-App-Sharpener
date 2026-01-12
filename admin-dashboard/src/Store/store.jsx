
import { configureStore } from "@reduxjs/toolkit";
import catalogueReducer from "./catalogueSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
    reducer:{
        catalogue: catalogueReducer,
        order : orderReducer,
    }
});

export default store;