import {createSlice }  from '@reduxjs/toolkit'


const generalSlice = createSlice({
    name:'general',
    initialState: {
        searching: false,
        reset:true,
        user_id:null,
        user_name:null,
        
    },
    reducers: {
        setGeneral: (state, action) =>{
            state.searching = action.payload.searching;
            state.reset = action.payload.reset;
            state.user_id = action.payload.user_id;
            state.user_name = action.payload.user_name;
            
        }
    }
})


export const {setGeneral} = generalSlice.actions
export default generalSlice.reducer