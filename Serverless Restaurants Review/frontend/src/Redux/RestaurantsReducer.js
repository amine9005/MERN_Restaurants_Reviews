import {createSlice }  from '@reduxjs/toolkit'


const restaurantsSlice = createSlice({
    name:'restaurants',
    initialState: {
        isLoading: true,
        data:null,
        error:false,
    },
    reducers: {
        setRestaurants: (state, action) =>{
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
        }

    }
})


export const {setRestaurants} = restaurantsSlice.actions
export default restaurantsSlice.reducer