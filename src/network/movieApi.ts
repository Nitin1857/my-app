import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export interface MovieListProp{
  Title: string;
  Year: string;
  Released: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  type: string
}

// Initial state
const initialState = {
    movieList: <MovieListProp[]>[],
    loading: false,
    error: null
};

// Async thunk to fetch movie data
export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (searchTerm: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?i=tt3896198&apikey=adf8d3bc`
            );
            if (response.data.Response === "False") {
                return rejectWithValue(response.data);
            }
            return response.data;  
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Create slice
const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action: any) => {
                state.loading = false;
                state.movieList = [...state.movieList, action.payload];
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as null;
            });
    }
});

export default moviesSlice.reducer;
