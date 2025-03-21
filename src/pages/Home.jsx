import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRandomMeals, fetchMealsBySearch, clearSearchResults, fetchMealsByCategory, clearMeals } from '../store/slices/mealSlice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { meals, loading, error, searchResults, randomMeals, lastRandomFetch, lastSearchQuery, lastCategory } = useSelector((state) => state.meals);

    useEffect(() => {
        // Sadece randomMeals boşsa veya cache süresi dolmuşsa yeni istek at
        if (!randomMeals.length || (lastRandomFetch && Date.now() - lastRandomFetch > 5 * 60 * 1000)) {
            dispatch(clearMeals()); // Kategori yemeklerini temizle
            dispatch(fetchRandomMeals(6));
        }
    }, [dispatch, randomMeals.length, lastRandomFetch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Aynı arama sorgusu için tekrar istek atma
            if (searchQuery.trim() !== lastSearchQuery) {
                dispatch(clearMeals()); // Kategori yemeklerini temizle
                dispatch(fetchMealsBySearch(searchQuery.trim()));
            }
        } else {
            dispatch(clearSearchResults());
            // Arama temizlendiğinde rastgele yemekleri göster
            if (!randomMeals.length || (lastRandomFetch && Date.now() - lastRandomFetch > 5 * 60 * 1000)) {
                dispatch(fetchRandomMeals(6));
            }
        }
    };

    const handleMealClick = (mealId) => {
        navigate(`/meal/${mealId}`);
    };

    const displayMeals = searchResults.length > 0
        ? searchResults
        : meals.length > 0
            ? meals
            : randomMeals;

    const displayTitle = searchResults.length > 0
        ? `Search Results for "${searchQuery}"`
        : lastCategory
            ? `Meals in ${lastCategory}`
            : 'Featured Recipes';

    return (
        <main className="min-h-screen">
            {/* Hero Section with Search */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
                </div>

                {/* Search Container */}
                <div className="relative z-10 w-full max-w-3xl px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg animate-fade-in">
                        Discover Delicious Recipes
                    </h1>
                    <form onSubmit={handleSearch} className="relative">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full"></div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for recipes..."
                            className="relative w-full px-6 py-4 bg-white/20 backdrop-blur-sm rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-white/70 transition-all duration-300"
                        />
                    </form>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
                    {displayTitle}
                </h2>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center text-red-500 mb-8 animate-fade-in">
                        {error}
                    </div>
                )}

                {/* Meals Grid */}
                {!loading && !error && displayMeals.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayMeals.map((meal, index) => (
                            <div
                                key={meal.idMeal}
                                onClick={() => handleMealClick(meal.idMeal)}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative h-48">
                                    <img
                                        src={meal.strMealThumb}
                                        alt={meal.strMeal}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-semibold text-white mb-1">{meal.strMeal}</h3>
                                        <p className="text-sm text-white/90">{meal.strCategory}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && !error && displayMeals.length === 0 && (
                    <div className="text-center text-gray-500 animate-fade-in">
                        No recipes found. Try a different search term.
                    </div>
                )}
            </div>
        </main>
    );
};

export default Home; 