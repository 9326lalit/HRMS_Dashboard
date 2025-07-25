import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
        const timer = setTimeout(() => {
            navigate('/login');
        }, 1000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (_jsx("div", { style: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f3f4f6"
        }, children: _jsxs("div", { style: {
                background: "#fff",
                padding: "36px 32px",
                borderRadius: "14px",
                boxShadow: "0 4px 24px rgba(60,72,88,0.13)",
                textAlign: "center",
                minWidth: "320px"
            }, children: [_jsx("h2", { style: {
                        fontSize: "22px",
                        fontWeight: 600,
                        marginBottom: "10px"
                    }, children: "Logging you out..." }), _jsx("p", { style: { color: "#6b7280", fontSize: "15px" }, children: "Please wait while we redirect you." }), _jsx("div", { style: { marginTop: "22px" }, children: _jsxs("svg", { style: {
                            animation: "spin 1s linear infinite",
                            height: "36px",
                            width: "36px",
                            color: "#7c3aed",
                            display: "block",
                            margin: "0 auto"
                        }, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { style: { opacity: 0.25 }, cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { style: { opacity: 0.75 }, fill: "currentColor", d: "M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3H4z" })] }) }), _jsx("style", { children: `
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          ` })] }) }));
};
export default Logout;
