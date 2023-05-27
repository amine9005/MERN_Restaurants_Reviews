import {createSlice }  from '@reduxjs/toolkit'


const generalSlice = createSlice({
    name:'general',
    initialState: {
        searching: false,
        reset:true,
        search_value: '',
        search_by: '',
        current_page:1,
        user_id: localStorage.getItem("user_id") ?? null,
        user_name: localStorage.getItem("user_name") ?? null,
    },
    reducers: {
        setGeneral: (state, action) =>{
            state.searching = action.payload.searching;
            state.reset = action.payload.reset;

        },
        updateCurrentUser(state,action){
            state.user_id = action.payload.user_id;
            state.user_name = action.payload.user_name;
        },
        setSearchValue(state,action){
            state.search_value = action.payload.search_value;
            state.search_by = action.payload.search_by;
        },setCurrentPage(state,action){
            state.current_page = action.payload.current_page;
        },setSearchBy(state,action){
            state.search_by = action.payload.search_by;
        }
        
    }
})


export const {setGeneral,updateCurrentUser,setSearchValue,setCurrentPage,setSearchBy} = generalSlice.actions
export default generalSlice.reducer