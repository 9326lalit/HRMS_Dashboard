// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Eye, EyeOff } from "lucide-react"
// import { useState } from "react"
// import { Link } from "react-router-dom"

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-white via-gray-100 to-white p-4">
//       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
//         {/* Left Section */}
//         <div className="bg-purple-800 text-white flex flex-col justify-center items-center px-10 py-16">
//           <img
//             src="/dashboard-preview.png"
//             alt="Dashboard Preview"
//             className="rounded-lg shadow-lg mb-8"
//           />
//           <h2 className="text-2xl font-semibold text-center mb-2">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//           </h2>
//           <p className="text-sm text-center max-w-md">
//             Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
//             quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//           </p>
//           <div className="flex space-x-1 mt-4">
//             <span className="w-2 h-2 bg-white rounded-full"></span>
//             <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
//             <span className="w-2 h-2 bg-white rounded-full"></span>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="p-10">
//           <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Dashboard</h2>
//           <form className="space-y-4">
//             {/* Full Name */}
//             <div>
//               <Label htmlFor="fullname" className="text-sm">Full name<span className="text-red-500">*</span></Label>
//               <Input id="fullname" placeholder="Full name" required />
//             </div>

//             {/* Email */}
//             <div>
//               <Label htmlFor="email" className="text-sm">Email Address<span className="text-red-500">*</span></Label>
//               <Input id="email" placeholder="Email Address" type="email" required />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <Label htmlFor="password" className="text-sm">Password<span className="text-red-500">*</span></Label>
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 required
//               />
//               <div
//                 className="absolute right-3 top-9 cursor-pointer text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">
//               <Label htmlFor="confirm-password" className="text-sm">Confirm Password<span className="text-red-500">*</span></Label>
//               <Input
//                 id="confirm-password"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 required
//               />
//               <div
//                 className="absolute right-3 top-9 cursor-pointer text-gray-500"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </div>
//             </div>

//             {/* Register Button */}
//             <Button className="w-full bg-purple-800 hover:bg-purple-700 text-white">
//               Register
//             </Button>

//             {/* Login Link */}
//             <p className="text-sm text-center text-muted-foreground">
//               Already have an account? <Link to="/login" className="text-purple-800 hover:underline">Login</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }



import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      fullname,
      email,
      password,
    };

    try {
      // Send data to the backend API for registration
      const response = await axios.post("http://localhost:5000/api/users/register", userData);
      if (response.data.success) {
        navigate("/login"); // Redirect to login page on success
      }
    } catch (err) {
      setError("An error occurred while registering. Please try again.");
      console.error(err);
    }
  };

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </h2>
          <p className="text-sm text-center max-w-md">
            Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="flex space-x-1 mt-4">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Dashboard</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Full Name */}
            <div>
              <Label htmlFor="fullname" className="text-sm">
                Full name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullname"
                placeholder="Full name"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm">
                Email Address<span className="text-red-500">*</span>
              </Label>
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
              <Label htmlFor="password" className="text-sm">
                Password<span className="text-red-500">*</span>
              </Label>
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

            {/* Confirm Password */}
            <div className="relative">
              <Label htmlFor="confirm-password" className="text-sm">
                Confirm Password<span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Register Button */}
            <Button className="w-full bg-purple-800 hover:bg-purple-700 text-white">
              Register
            </Button>

            {/* Login Link */}
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-800 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}


