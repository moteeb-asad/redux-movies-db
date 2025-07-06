import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG, STATUSES } from '../constants';

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    data: [],
    status: STATUSES.LOADING,
    query: 'trending/all/day',
    clickedMovie: null,
    loadmore: false,
    page: 1,
    sortBy: '',
    isSortByInitialized: false,
  },
  reducers: {
    fetchByHeaderFilter: (state, action) => {
      state.data = [];
      state.query = action.payload;
      state.loadmore = false;
      state.isSortByInitialized = false;
    },
    fetchByLoadMore: (state, action) => {
      state.query = action.payload;
      state.loadmore = true;
      state.page += 1;
    },
    fetchBySidebarSorting: (state, action) => {
      state.loadmore = true;
      state.page = 1;
      state.sortBy = action.payload;
    },
    setClickedMovie: (state, action) => {
      state.clickedMovie = action.payload;
    },
    clearMoviesState: (state, action) => {
      state.data = [];
      state.status = STATUSES.LOADING;
      state.query = action.payload;
      state.loadmore = false;
      state.page = 1;
      state.sortBy = '';
    },
    setSortByInitialized: (state, action) => {
      state.isSortByInitialized = action.payload;
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const {
  setMovies,
  setStatus,
  fetchByHeaderFilter,
  fetchByHeaderType,
  fetchByLoadMore,
  fetchBySidebarSorting,
  setClickedMovie,
  clearMoviesState,
  setSortByInitialized,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const fetchMovies = createAsyncThunk(
  'movies/fetch',
  async (_, { getState, dispatch }) => {
    try {
      const state = getState();

      if (state.movies.query === 'popular') {
        console.log('popular.state.movies-------', state.movies);
        let combinedArray = [];
        const [moviesRes, tvRes] = await Promise.all([
          axios.get(
            `${API_CONFIG.BASE_URL}movie/popular?api_key=${API_CONFIG.API_KEY}`
          ),
          axios.get(
            `${API_CONFIG.BASE_URL}tv/popular?api_key=${API_CONFIG.API_KEY}`
          ),
        ]);
        const movies = moviesRes.data.results;
        const tv = tvRes.data.results;
        combinedArray = [...movies, ...tv];
        return combinedArray;
      } else if (state.movies.query === 'upcoming') {
        console.log('upcoming.state.movies-------', state.movies);
        let combinedArray = [];
        const [moviesRes, tvRes] = await Promise.all([
          axios.get(
            `${API_CONFIG.BASE_URL}movie/upcoming?api_key=${API_CONFIG.API_KEY}`
          ),
          axios.get(
            `${API_CONFIG.BASE_URL}tv/on_the_air?api_key=${API_CONFIG.API_KEY}`
          ),
        ]);
        const movies = moviesRes.data.results;
        const tv = tvRes.data.results;
        combinedArray = [...movies, ...tv];
        return combinedArray;
      } else if (state.movies.query.startsWith('discover/movie')) {
        // If the query already includes parameters, don't add more
        let url = `${API_CONFIG.BASE_URL}${state.movies.query}`;
        if (!url.includes('api_key=')) {
          url +=
            (url.includes('?') ? '&' : '?') + `api_key=${API_CONFIG.API_KEY}`;
        }
        if (!url.includes('region=') && !url.includes('region')) {
          url += '&region=US';
        }
        const res = await axios.get(url);
        let newResults = res.data.results;
        let combinedDiscoveredMovies;

        if (
          (state.movies.sortBy !== '' && state.movies.isSortByInitialized) ||
          state.movies.loadmore
        ) {
          combinedDiscoveredMovies = [...state.movies.data, ...newResults];
        } else {
          combinedDiscoveredMovies = newResults;
        }

        return combinedDiscoveredMovies;
      } else {
        console.log('general.state.movies-------', state.movies);
        console.log(
          `${API_CONFIG.BASE_URL}${state.movies.query}?api_key=${API_CONFIG.API_KEY}&region=US`
        );
        const res = await axios.get(
          `${API_CONFIG.BASE_URL}${state.movies.query}?api_key=${API_CONFIG.API_KEY}&region=US`
        );
        return res.data.results;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
