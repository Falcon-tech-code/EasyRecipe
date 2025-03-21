import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Async thunks
export const fetchRandomMeals = createAsyncThunk(
    'meals/fetchRandomMeals',
    async (count = 6) => {
        const promises = Array(count).fill().map(() =>
            axios.get(`${BASE_URL}/random.php`)
        );
        const responses = await Promise.all(promises);
        const meals = responses.map(response => response.data.meals[0]);

        // Tekrarlanan yemekleri filtrele
        const uniqueMeals = meals.filter((meal, index, self) =>
            index === self.findIndex((m) => m.idMeal === meal.idMeal)
        );

        // Eğer yeterli benzersiz yemek yoksa, eksik olan kadar yeni yemek getir
        if (uniqueMeals.length < count) {
            const remainingCount = count - uniqueMeals.length;
            const additionalPromises = Array(remainingCount).fill().map(() =>
                axios.get(`${BASE_URL}/random.php`)
            );
            const additionalResponses = await Promise.all(additionalPromises);
            const additionalMeals = additionalResponses.map(response => response.data.meals[0]);

            // Yeni yemekleri de benzersiz olacak şekilde filtrele
            const allMeals = [...uniqueMeals, ...additionalMeals];
            return allMeals.filter((meal, index, self) =>
                index === self.findIndex((m) => m.idMeal === meal.idMeal)
            ).slice(0, count);
        }

        return uniqueMeals;
    }
);

export const fetchMealsByCategory = createAsyncThunk(
    'meals/fetchMealsByCategory',
    async (category) => {
        const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
        const meals = response.data.meals || [];
        return meals.map(meal => ({
            ...meal,
            strCategory: category
        }));
    }
);

export const fetchMealsBySearch = createAsyncThunk(
    'meals/fetchMealsBySearch',
    async (query) => {
        const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
        return response.data.meals || [];
    }
);

export const fetchMealById = createAsyncThunk(
    'meals/fetchMealById',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
        return response.data.meals[0];
    }
);

export const fetchCategories = createAsyncThunk(
    'meals/fetchCategories',
    async () => {
        const response = await axios.get(`${BASE_URL}/categories.php`);
        return response.data.categories;
    }
);

const initialState = {
    meals: [],
    selectedMeal: null,
    categories: [],
    loading: false,
    error: null,
    searchResults: [],
    randomMeals: [],
    lastCategory: null,
    lastSearchQuery: null,
    lastRandomFetch: null,
    cacheTimeout: 5 * 60 * 1000, // 5 dakika
};

const mealSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        clearSearchResults: (state) => {
            state.searchResults = [];
            state.lastSearchQuery = null;
        },
        clearRandomMeals: (state) => {
            state.randomMeals = [];
            state.lastRandomFetch = null;
        },
        clearSelectedMeal: (state) => {
            state.selectedMeal = null;
        },
        clearMeals: (state) => {
            state.meals = [];
            state.lastCategory = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Random Meals
            .addCase(fetchRandomMeals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRandomMeals.fulfilled, (state, action) => {
                state.loading = false;
                state.randomMeals = action.payload;
                state.lastRandomFetch = Date.now();
            })
            .addCase(fetchRandomMeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Meals by Category
            .addCase(fetchMealsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMealsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.meals = action.payload;
                state.lastCategory = action.meta.arg;
                state.searchResults = []; // Arama sonuçlarını temizle
            })
            .addCase(fetchMealsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Search Results
            .addCase(fetchMealsBySearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMealsBySearch.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
                state.lastSearchQuery = action.meta.arg;
                state.meals = []; // Kategori yemeklerini temizle
            })
            .addCase(fetchMealsBySearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Meal Detail
            .addCase(fetchMealById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMealById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMeal = action.payload;
            })
            .addCase(fetchMealById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSearchResults, clearRandomMeals, clearSelectedMeal, clearMeals } = mealSlice.actions;
export default mealSlice.reducer; 