import { configureStore } from "@reduxjs/toolkit";
import RestaurantsReducer from "./RestaurantsReducer";

const store = configureStore({
    reducer: {
        restaurants:RestaurantsReducer
    },
   
})

export default store