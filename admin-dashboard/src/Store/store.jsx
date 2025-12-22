
import { configureStore } from "@reduxjs/toolkit";
import catalogueReducer from "./catalogueSlice";

const store = configureStore({
    reducer:{
        catalogue: catalogueReducer,
    }
});

export default store;