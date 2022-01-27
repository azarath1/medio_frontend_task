import { createSlice } from '@reduxjs/toolkit';

export const siteInfo = createSlice({
    name: "site",
    initialState: {
        site: null
    },
    reducers: {
        loginSite: (state) => {
            state.site = "userpage";
        },
        logoutSite: (state) => {
            state.site = "logout";
        },
        cityview: (state) => {
            state.site = "city";
        },
        citybymegye: (state) => {
            state.site = "query"
        }
    }
})


export const { loginSite, logoutSite, cityview, citybymegye } = siteInfo.actions;
export const selectSite = (state) => state.site.site;
export default siteInfo.reducer;