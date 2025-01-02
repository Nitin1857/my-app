import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../network/movieApi";

export const store = configureStore({
    reducer: {
        movies: moviesReducer
    }
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
