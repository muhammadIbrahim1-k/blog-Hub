import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dark : false
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:{
        darkMode :  (state) => {
            state.dark = !state.dark;
        }
    }
})

export const {darkMode} = themeSlice.actions;

export default themeSlice.reducer;