// import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// import RegisterPage from './auth/Register';
// import LoginPage from './auth/Login';
// import Logout from './auth/Logout';

// import CandidatesPage from './pages/Cadidate';
// import Sidebar from './Layout/Sidebar';
// import Employee from './pages/Employee';
// import Leave from './pages/Leaves';
// import Attendance from './pages/Attendance';

// export default function App() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Sidebar should be hidden on login, register, logout
//   const hideSidebar =
//     location.pathname === '/login' ||
//     location.pathname === '/register' ||
//     location.pathname === '/logout';

//   // Redirect to /candidates if user is on login/register and already authenticated
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('token'); // adjust key if needed

//     if ((location.pathname === '/login' || location.pathname === '/register') && isLoggedIn) {
//       navigate('/candidates');
//     }
//   }, [location, navigate]);

//   return (
//     <div className="flex">
//       {!hideSidebar && <Sidebar />}
//       <div className={`flex-1 ${!hideSidebar ? 'p-4' : ''}`}>
//         <Routes>
//           {/* Auth pages */}
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/logout" element={<Logout />} />

//           {/* App pages with sidebar */}
//           <Route path="/candidates" element={<CandidatesPage />} />
//           <Route path="/employees" element={<Employee />} />
//           <Route path="/leaves" element={<Leave />} />
//           <Route path="/attendance" element={<Attendance />} />

//           {/* You can add more routes like dashboard here */}
//         </Routes>
//       </div>
//     </div>
//   );
// }



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
  const hideSidebar =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/logout';

  // Redirect to /candidates if user is on login/register and already authenticated
  useEffect(() => {
    if ((location.pathname === '/login' || location.pathname === '/register') && isLoggedIn) {
      navigate('/candidates');
    }
  }, [location, navigate, isLoggedIn]);

  // Protected Route Component
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <div className="flex">
      
      {/* Conditionally render Sidebar based on hideSidebar value */}
      {!hideSidebar && <Sidebar />}
      <div className={`flex-1 ${!hideSidebar ? 'p-4' : ''}`}>
        <Routes>
          {/* Auth pages */}
          <Route path="/register" element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/candidates" />} />
          <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/candidates" />} />
          <Route path="/logout" element={<Logout />} />

          {/* App pages with sidebar (Protected Routes) */}
          <Route
            path="/"
            element={<ProtectedRoute><CandidatesPage /></ProtectedRoute>}
          />
          {/* <Route
            path="/candidates"
            element={<ProtectedRoute><CandidatesPage /></ProtectedRoute>}
          /> */}
          <Route
            path="/employees"
            element={<ProtectedRoute><Employee /></ProtectedRoute>}
          />
          <Route
            path="/leaves"
            element={<ProtectedRoute><Leave /></ProtectedRoute>}
          />
          <Route
            path="/attendance"
            element={<ProtectedRoute><Attendance /></ProtectedRoute>}
          />

          {/* You can add more routes here */}
        </Routes>
      </div>
    </div>
  );
}
