import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        user: userSlice.reducer
    }
})

export default store;