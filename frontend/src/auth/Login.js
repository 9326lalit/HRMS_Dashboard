import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://hrmsbackend-27mf.onrender.com/api/users/login", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/");
        }
        catch (err) {
            setError("Invalid credentials, please try again.");
        }
    };
    return (_jsx("div", { style: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(90deg, #fff 0%, #f3f4f6 50%, #fff 100%)",
            padding: "24px"
        }, children: _jsxs("div", { style: {
                width: "100%",
                maxWidth: "1100px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: "#fff",
                borderRadius: "28px",
                boxShadow: "0 6px 32px rgba(60,72,88,0.13)",
                overflow: "hidden"
            }, children: [_jsxs("div", { style: {
                        background: "#7c3aed",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "64px 32px"
                    }, children: [_jsx("img", { src: "https://jerp.jmrinfotech.com/images/hrms.jpg", alt: "Dashboard Preview", style: {
                                borderRadius: "16px",
                                boxShadow: "0 4px 24px rgba(60,72,88,0.18)",
                                marginBottom: "32px",
                                width: "260px",
                                maxWidth: "100%"
                            } }), _jsx("h2", { style: {
                                fontSize: "24px",
                                fontWeight: 600,
                                textAlign: "center",
                                marginBottom: "10px"
                            }, children: "Login and manage your dashboard effortlessly" }), _jsx("p", { style: {
                                fontSize: "15px",
                                textAlign: "center",
                                maxWidth: "340px",
                                margin: "0 auto"
                            }, children: "Stay connected, track updates, and enjoy a seamless experience with our platform." }), _jsxs("div", { style: { display: "flex", gap: "6px", marginTop: "18px" }, children: [_jsx("span", { style: { width: "10px", height: "10px", background: "#fff", borderRadius: "50%" } }), _jsx("span", { style: { width: "10px", height: "10px", background: "#6d28d9", borderRadius: "50%" } }), _jsx("span", { style: { width: "10px", height: "10px", background: "#fff", borderRadius: "50%" } })] })] }), _jsxs("div", { style: {
                        padding: "48px 36px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }, children: [_jsx("h2", { style: {
                                fontSize: "24px",
                                fontWeight: "bold",
                                marginBottom: "28px",
                                textAlign: "center"
                            }, children: "Welcome Back" }), _jsxs("form", { style: { display: "flex", flexDirection: "column", gap: "18px" }, onSubmit: handleLogin, children: [_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "6px" }, children: [_jsxs("label", { htmlFor: "email", style: { fontSize: "15px", fontWeight: 500 }, children: ["Email Address", _jsx("span", { style: { color: "#e11d48" }, children: "*" })] }), _jsx("input", { id: "email", placeholder: "Email Address", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), style: {
                                                padding: "10px 14px",
                                                borderRadius: "6px",
                                                border: "1px solid #d1d5db",
                                                fontSize: "15px",
                                                background: "#fff"
                                            } })] }), _jsxs("div", { style: { position: "relative", display: "flex", flexDirection: "column", gap: "6px" }, children: [_jsxs("label", { htmlFor: "password", style: { fontSize: "15px", fontWeight: 500 }, children: ["Password", _jsx("span", { style: { color: "#e11d48" }, children: "*" })] }), _jsx("input", { id: "password", type: showPassword ? "text" : "password", placeholder: "Password", required: true, value: password, onChange: (e) => setPassword(e.target.value), style: {
                                                padding: "10px 14px",
                                                borderRadius: "6px",
                                                border: "1px solid #d1d5db",
                                                fontSize: "15px",
                                                background: "#fff"
                                            } }), _jsx("div", { style: {
                                                position: "absolute",
                                                right: "14px",
                                                top: "38px",
                                                cursor: "pointer",
                                                color: "#6b7280"
                                            }, onClick: () => setShowPassword(!showPassword), children: showPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] }), error && _jsx("p", { style: { color: "#e11d48", textAlign: "center", margin: 0 }, children: error }), _jsx("button", { type: "submit", style: {
                                        width: "100%",
                                        background: "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)",
                                        color: "#fff",
                                        padding: "12px 0",
                                        border: "none",
                                        borderRadius: "6px",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        cursor: "pointer",
                                        marginTop: "8px",
                                        transition: "background 0.2s"
                                    }, onMouseOver: e => (e.currentTarget.style.background = "linear-gradient(90deg, #5b21b6 60%, #a78bfa 100%)"), onMouseOut: e => (e.currentTarget.style.background = "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)"), children: "Login" }), _jsxs("p", { style: { fontSize: "14px", textAlign: "center", color: "#6b7280", marginTop: "6px" }, children: ["Don't have an account?", " ", _jsx(Link, { to: "/register", style: { color: "#7c3aed", textDecoration: "underline" }, children: "Register" })] })] })] })] }) }));
}
