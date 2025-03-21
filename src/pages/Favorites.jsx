import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromFavorites } from '../store/slices/favoritesSlice';

const Favorites = () => {
    const dispatch = useDispatch();
    const { favorites } = useSelector(state => state.favorites);

    const handleRemoveFavorite = (mealId) => {
        dispatch(removeFromFavorites(mealId));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favorite Recipes</h1>

                {/* Favorites Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(meal => (
                        <div
                            key={meal.idMeal}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
                        >
                            <Link to={`/meal/${meal.idMeal}`}>
                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{meal.strMeal}</h3>
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => handleRemoveFavorite(meal.idMeal)}
                                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                    <Link
                                        to={`/meal/${meal.idMeal}`}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {favorites.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">You haven't added any recipes to your favorites yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites; 