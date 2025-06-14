import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.find(m => m.id === movie.id);
      if (!exists) {
        state.push(movie);
      }
    },
    removeFavorite: (state, action) => {
      const id = action.payload;
      return state.filter(m => m.id !== id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
