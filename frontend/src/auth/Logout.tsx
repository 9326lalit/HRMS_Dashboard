import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f3f4f6"
    }}>
      <div style={{
        background: "#fff",
        padding: "36px 32px",
        borderRadius: "14px",
        boxShadow: "0 4px 24px rgba(60,72,88,0.13)",
        textAlign: "center",
        minWidth: "320px"
      }}>
        <h2 style={{
          fontSize: "22px",
          fontWeight: 600,
          marginBottom: "10px"
        }}>Logging you out...</h2>
        <p style={{ color: "#6b7280", fontSize: "15px" }}>
          Please wait while we redirect you.
        </p>
        <div style={{ marginTop: "22px" }}>
          <svg
            style={{
              animation: "spin 1s linear infinite",
              height: "36px",
              width: "36px",
              color: "#7c3aed",
              display: "block",
              margin: "0 auto"
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              style={{ opacity: 0.25 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              style={{ opacity: 0.75 }}
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3H4z"
            ></path>
          </svg>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Logout;