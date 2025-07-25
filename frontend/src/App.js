import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import RegisterPage from './auth/Register';
import LoginPage from './auth/Login';
import Logout from './auth/Logout';
import Sidebar from './Layout/Sidebar';
import Employee from './pages/Employee';
import Leave from './pages/Leaves';
import Attendance from './pages/Attendance';
import CandidatesPage from './pages/Cadidate';
export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    // Check if user is logged in (has token in localStorage)
    const isLoggedIn = localStorage.getItem('token');
    // Sidebar should be hidden on login, register, logout
    const hideSidebar = location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/logout';
    // Redirect to /candidates if user is on login/register and already authenticated
    useEffect(() => {
        if ((location.pathname === '/login' || location.pathname === '/register') && isLoggedIn) {
            navigate('/candidates');
        }
    }, [location, navigate, isLoggedIn]);
    // Protected Route Component
    const ProtectedRoute = ({ children }) => {
        return isLoggedIn ? children : _jsx(Navigate, { to: "/login" });
    };
    return (_jsxs("div", { className: "flex", children: [!hideSidebar && _jsx(Sidebar, {}), _jsx("div", { className: `flex-1 ${!hideSidebar ? 'p-4' : ''}`, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/register", element: !isLoggedIn ? _jsx(RegisterPage, {}) : _jsx(Navigate, { to: "/candidates" }) }), _jsx(Route, { path: "/login", element: !isLoggedIn ? _jsx(LoginPage, {}) : _jsx(Navigate, { to: "/candidates" }) }), _jsx(Route, { path: "/logout", element: _jsx(Logout, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(CandidatesPage, {}) }) }), _jsx(Route, { path: "/employees", element: _jsx(ProtectedRoute, { children: _jsx(Employee, {}) }) }), _jsx(Route, { path: "/leaves", element: _jsx(ProtectedRoute, { children: _jsx(Leave, {}) }) }), _jsx(Route, { path: "/attendance", element: _jsx(ProtectedRoute, { children: _jsx(Attendance, {}) }) })] }) })] }));
}
