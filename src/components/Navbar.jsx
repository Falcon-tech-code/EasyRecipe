import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchMealsByCategory, clearSearchResults, fetchRandomMeals, clearRandomMeals } from '../store/slices/mealSlice'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categories = [
        'beef', 'chicken', 'dessert', 'lamb', 'miscellaneous',
        'pasta', 'pork', 'seafood', 'side', 'starter',
        'vegan', 'vegetarian', 'breakfast', 'goat'
    ]

    const handleCategoryClick = (category) => {
        dispatch(clearSearchResults());
        dispatch(fetchMealsByCategory(category));
        setIsMenuOpen(false);
        navigate('/');
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        dispatch(clearSearchResults());
        dispatch(clearRandomMeals());
        dispatch(fetchRandomMeals(6));
        navigate('/');
    };

    return (
        <nav className="fixed w-full top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Title */}
                    <Link to="/" onClick={handleLogoClick} className="flex items-center hover:opacity-80 transition-opacity">
                        <img
                            src="/logo/logo.png"
                            alt="Easy Recipe Logo"
                            className="h-12 w-12 mr-2"
                        />
                        <span className="text-xl font-bold text-gray-800">Easy Recipe</span>
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none transform transition-all duration-300 hover:scale-110 hover:rotate-12"
                    >
                        <svg
                            className="h-6 w-6 transition-transform duration-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Hamburger Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} fixed inset-0 z-40`}>
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-300 ${isMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                {/* Menu Panel */}
                <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-xl transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        {/* Menu Header */}
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none transform transition-all duration-300 hover:scale-110 hover:rotate-12"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="space-y-2 p-4">
                                {categories.map((category, index) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryClick(category)}
                                        className={`block w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900 capitalize transform hover:translate-x-2 ${isMenuOpen ? 'animate-slide-in' : ''
                                            }`}
                                        style={{
                                            animationDelay: `${index * 50}ms`
                                        }}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar