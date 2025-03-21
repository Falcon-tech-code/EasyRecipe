import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const mealApi = {
    // Tüm kategorileri getir
    getCategories: () => axios.get(`${BASE_URL}/categories.php`),

    // Kategoriye göre yemekleri getir
    getMealsByCategory: (category) => axios.get(`${BASE_URL}/filter.php?c=${category}`),

    // Yemek detaylarını getir
    getMealDetails: (id) => axios.get(`${BASE_URL}/lookup.php?i=${id}`),

    // Rastgele yemek getir
    getRandomMeal: () => axios.get(`${BASE_URL}/random.php`),

    // İsme göre yemek ara
    searchMeals: (query) => axios.get(`${BASE_URL}/search.php?s=${query}`),

    // İlk harfe göre yemek ara
    searchMealsByFirstLetter: (letter) => axios.get(`${BASE_URL}/search.php?f=${letter}`),
}; 