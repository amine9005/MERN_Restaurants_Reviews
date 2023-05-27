import {createSlice }  from '@reduxjs/toolkit'


const restaurantsSlice = createSlice({
    name:'restaurants',
    initialState: {
        isLoading: true,
        data:null,
        error:false,
        page_count:0,
    },
    reducers: {
        setRestaurants: (state, action) =>{
            state.isLoading = action.payload.isLoading;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.page_count = action.payload.page_count;

        }

    }
})


export const {setRestaurants} = restaurantsSlice.actions
export default restaurantsSlice.reducer