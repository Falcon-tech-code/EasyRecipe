import { configureStore } from '@reduxjs/toolkit';
import mealReducer from './slices/mealSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
    reducer: {
        meals: mealReducer,
        favorites: favoritesReducer
    },
}); 