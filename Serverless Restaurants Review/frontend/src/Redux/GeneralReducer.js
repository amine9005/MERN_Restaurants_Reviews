import {createSlice }  from '@reduxjs/toolkit'


const generalSlice = createSlice({
    name:'general',
    initialState: {
        searching: false,
        reset:true,
        user_id: localStorage.getItem("user_id") ?? null,
        user_name: localStorage.getItem("user_name") ?? null,
        user_reviews: localStorage.getItem("user_reviews") ?? null,
        
    },
    reducers: {
        setGeneral: (state, action) =>{
            state.searching = action.payload.searching;
            state.reset = action.payload.reset;
        },
        updateCurrentUser(state,action){
            state.user_id = action.payload.user_id;
            state.user_name = action.payload.user_name;
            state.user_reviews = action.payload.user_reviews;
        }
    }
})


export const {setGeneral,updateCurrentUser} = generalSlice.actions
export default generalSlice.reducer