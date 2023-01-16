import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import todoSliceReducer from "../features/todo/todoSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        todo: todoSliceReducer,
    },
    middleware: (GDM) => GDM().concat(apiSlice.middleware),
});
