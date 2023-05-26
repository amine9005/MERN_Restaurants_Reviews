import { configureStore } from "@reduxjs/toolkit";
import RestaurantsReducer from "./RestaurantsReducer";
import GeneralReducer from "./GeneralReducer";
import ReviewReducer from "./ReviewReducer";

const store = configureStore({
    reducer: {
        restaurants:RestaurantsReducer,
        general:GeneralReducer,
        review:ReviewReducer,
    },
   
})

export default store