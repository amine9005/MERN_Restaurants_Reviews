import {createSlice }  from '@reduxjs/toolkit'


const generalSlice = createSlice({
    name:'general',
    initialState: {
        searching: false,
        reset:true,
        
    },
    reducers: {
        setGeneral: (state, action) =>{
            state.searching = action.payload.searching;
            state.reset = action.payload.reset;
            
        }
    }
})


export const {setGeneral} = generalSlice.actions
export default generalSlice.reducer