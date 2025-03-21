import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: []
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const meal = action.payload;
            if (!state.favorites.find(fav => fav.idMeal === meal.idMeal)) {
                state.favorites.push(meal);
            }
        },
        removeFromFavorites: (state, action) => {
            const mealId = action.payload;
            state.favorites = state.favorites.filter(fav => fav.idMeal !== mealId);
        }
    }
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer; 