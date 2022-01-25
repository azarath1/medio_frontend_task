import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        cityview: (state) => {
            state.user = "city"
        }
    }
});

export const { login, logout, cityview } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;