import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : false,
    username : "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        updateUsername: (state, action) => {
            state.isLoggedIn = true;
            state.username = action.payload;
        }
    }
})

export  const {updateUsername}= userSlice.actions;

export default userSlice.reducer;