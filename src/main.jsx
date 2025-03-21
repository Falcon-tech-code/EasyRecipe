import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { store } from './store/store'
import App from './App'
import Home from './pages/Home'
import MealDetail from './pages/MealDetail'
import Favorites from './pages/Favorites'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="meal/:id" element={<MealDetail />} />
                        <Route path="favorites" element={<Favorites />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
)
