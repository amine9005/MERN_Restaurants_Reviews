import { createSlice } from "@reduxjs/toolkit";


const reviewSlice = createSlice({
    name: "review",
    initialState: {
        available: false,
        title:null,
        review:null,
        rating:null,
    },
    reducers: {
        setReview: (state, action) => {
            state.available = action.payload.available;
            state.title = action.payload.title;
            state.review = action.payload.review;
            state.rating = action.payload.rating;
        }
    }
})

export const { setReview } = reviewSlice.actions
export default reviewSlice.reducer