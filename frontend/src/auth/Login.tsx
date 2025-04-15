import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios" // Import axios for API call

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      // API call to the backend for login
      const response = await axios.post("https://hrmsbackend-27mf.onrender.com/api/users/login", { email, password })

      // Store the JWT token in localStorage
      localStorage.setItem("token", response.data.token)

      // Redirect to dashboard after successful login
      navigate("/candidates")
    } catch (err) {
      // Handle error if login fails
      setError("Invalid credentials, please try again.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-white via-gray-100 to-white p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Left Section */}
        <div className="bg-purple-800 text-white flex flex-col justify-center items-center px-10 py-16">
          <img
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            className="rounded-lg shadow-lg mb-8"
          />
          <h2 className="text-2xl font-semibold text-center mb-2">
            Login and manage your dashboard effortlessly
          </h2>
          <p className="text-sm text-center max-w-md">
            Stay connected, track updates, and enjoy a seamless experience with our platform.
          </p>
          <div className="flex space-x-1 mt-4">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm">Email Address<span className="text-red-500">*</span></Label>
              <Input
                id="email"
                placeholder="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Label htmlFor="password" className="text-sm">Password<span className="text-red-500">*</span></Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Login Button */}
            <Button type="submit" className="w-full bg-purple-800 hover:bg-purple-700 text-white">
              Login
            </Button>

            {/* Register Link */}
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account? <Link to="/register" className="text-purple-800 hover:underline">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

