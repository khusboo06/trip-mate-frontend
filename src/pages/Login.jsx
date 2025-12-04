



// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", formData);
//       if (res.data?.token) {
//         login(res.data.user, res.data.token);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] px-3 py-16 sm:py-18 mt-14 sm:mt-0">
//       <div className="w-full max-w-md bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl shadow-2xl p-5 sm:p-8 mt-1 sm:mt-8">
//         {/* Header */}
//         <h2 className="text-3xl font-bold text-center mb-6 font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
//           Login to TripMate
//         </h2>

//         {/* Error Message */}
//         {error && (
//           <p className="text-center text-red-400 font-medium mb-4 bg-red-900/30 py-2 rounded-lg border border-red-500/30">
//             {error}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5 font-['Poppins']">
//           {/* Email Field */}
//           <div>
//             <label className="block text-[#f9f7e8]/90 mb-1 font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-[#f9f7e8]/90 mb-1 font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all duration-300"
//           >
//             Login
//           </button>

//           {/* Forgot Password Link */}
//           <div className="text-center mt-2">
//             <Link
//               to="/forgot-password"
//               className="text-[#d4af37] text-sm hover:underline font-medium"
//             >
//               Forgot Password?
//             </Link>
//           </div>
//         </form>

//         {/* Divider Line */}
//         <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />

//         {/* Register CTA */}
//         <p className="text-center mt-4 text-[#f9f7e8]/80 font-['Poppins']">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-[#d4af37] font-semibold hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // ✅ use env instead of hardcoded URL

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/login`,   // ✅ updated here
        formData
      );

      if (res.data?.token) {
        login(res.data.user, res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] px-3 py-16 sm:py-18 mt-14 sm:mt-0">
      <div className="w-full max-w-md bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl shadow-2xl p-5 sm:p-8 mt-1 sm:mt-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6 font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
          Login to TripMate
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-400 font-medium mb-4 bg-red-900/30 py-2 rounded-lg border border-red-500/30">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 font-['Poppins']">
          {/* Email Field */}
          <div>
            <label className="block text-[#f9f7e8]/90 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#f9f7e8]/90 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all duration-300"
          >
            Login
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-2">
            <Link
              to="/forgot-password"
              className="text-[#d4af37] text-sm hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        {/* Divider Line */}
        <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />

        {/* Register CTA */}
        <p className="text-center mt-4 text-[#f9f7e8]/80 font-['Poppins']">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#d4af37] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
