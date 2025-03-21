import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { fetchRandomMeals } from './store/slices/mealSlice'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRandomMeals(6));
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default App
