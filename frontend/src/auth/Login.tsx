import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://hrmsbackend-27mf.onrender.com/api/users/login", { email, password })
      localStorage.setItem("token", response.data.token)
      navigate("/candidates")
    } catch (err) {
      setError("Invalid credentials, please try again.")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(90deg, #fff 0%, #f3f4f6 50%, #fff 100%)",
      padding: "24px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "1100px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#fff",
        borderRadius: "28px",
        boxShadow: "0 6px 32px rgba(60,72,88,0.13)",
        overflow: "hidden"
      }}>
        {/* Left Section */}
        <div style={{
          background: "#7c3aed",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "64px 32px"
        }}>
          <img
            src="https://jerp.jmrinfotech.com/images/hrms.jpg"
            alt="Dashboard Preview"
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(60,72,88,0.18)",
              marginBottom: "32px",
              width: "260px",
              maxWidth: "100%"
            }}
          />
          <h2 style={{
            fontSize: "24px",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "10px"
          }}>
            Login and manage your dashboard effortlessly
          </h2>
          <p style={{
            fontSize: "15px",
            textAlign: "center",
            maxWidth: "340px",
            margin: "0 auto"
          }}>
            Stay connected, track updates, and enjoy a seamless experience with our platform.
          </p>
          <div style={{ display: "flex", gap: "6px", marginTop: "18px" }}>
            <span style={{ width: "10px", height: "10px", background: "#fff", borderRadius: "50%" }}></span>
            <span style={{ width: "10px", height: "10px", background: "#6d28d9", borderRadius: "50%" }}></span>
            <span style={{ width: "10px", height: "10px", background: "#fff", borderRadius: "50%" }}></span>
          </div>
        </div>

        {/* Right Section */}
        <div style={{
          padding: "48px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "28px",
            textAlign: "center"
          }}>Welcome Back</h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "18px" }} onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="email" style={{ fontSize: "15px", fontWeight: 500 }}>
                Email Address<span style={{ color: "#e11d48" }}>*</span>
              </label>
              <input
                id="email"
                placeholder="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                  background: "#fff"
                }}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="password" style={{ fontSize: "15px", fontWeight: 500 }}>
                Password<span style={{ color: "#e11d48" }}>*</span>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  fontSize: "15px",
                  background: "#fff"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "38px",
                  cursor: "pointer",
                  color: "#6b7280"
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* Error Message */}
            {error && <p style={{ color: "#e11d48", textAlign: "center", margin: 0 }}>{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              style={{
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
              }}
              onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #5b21b6 60%, #a78bfa 100%)")}
              onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #7c3aed 60%, #a78bfa 100%)")}
            >
              Login
            </button>

            {/* Register Link */}
            <p style={{ fontSize: "14px", textAlign: "center", color: "#6b7280", marginTop: "6px" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#7c3aed", textDecoration: "underline" }}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}