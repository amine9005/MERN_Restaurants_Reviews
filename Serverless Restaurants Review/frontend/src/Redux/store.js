import { configureStore } from "@reduxjs/toolkit";
import RestaurantsReducer from "./RestaurantsReducer";
import GeneralReducer from "./GeneralReducer";

const store = configureStore({
    reducer: {
        restaurants:RestaurantsReducer,
        general:GeneralReducer
    },
   
})

export default store