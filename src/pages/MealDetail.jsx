import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealById, clearSelectedMeal } from '../store/slices/mealSlice';

const MealDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedMeal, loading, error } = useSelector((state) => state.meals);

    useEffect(() => {
        dispatch(fetchMealById(id));
        return () => {
            dispatch(clearSelectedMeal());
        };
    }, [dispatch, id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error || !selectedMeal) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading recipe</h2>
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // YouTube video ID'sini URL'den çıkar
    const getYoutubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYoutubeVideoId(selectedMeal.strYoutube);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 pt-20">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-20 left-4 z-40 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white/90 transition-all duration-300 flex items-center gap-2 group"
            >
                <svg
                    className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Back
            </button>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={selectedMeal.strMealThumb}
                            alt={selectedMeal.strMeal}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-gray-900">{selectedMeal.strMeal}</h1>
                        <div className="flex items-center space-x-4">
                            <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm">
                                {selectedMeal.strCategory}
                            </span>
                            <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm">
                                {selectedMeal.strArea}
                            </span>
                        </div>

                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-semibold text-gray-900">Instructions</h2>
                            <p className="text-gray-700 whitespace-pre-line">{selectedMeal.strInstructions}</p>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                            <ul className="grid grid-cols-2 gap-4">
                                {Array.from({ length: 20 }, (_, i) => {
                                    const ingredient = selectedMeal[`strIngredient${i + 1}`];
                                    const measure = selectedMeal[`strMeasure${i + 1}`];
                                    return ingredient && measure && (
                                        <li key={i} className="flex items-center space-x-2">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                            <span className="text-gray-700">
                                                {measure} {ingredient}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* YouTube Video */}
                        {videoId && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Watch Video</h2>
                                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
                                    <iframe
                                        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                                        title="Recipe Video"
                                        className="absolute top-0 left-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetail; 