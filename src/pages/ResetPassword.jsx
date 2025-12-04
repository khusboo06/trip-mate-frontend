


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { KeyRound } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// export default function ResetPassword() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/auth/reset-password`, {
//         otp,
//         newPassword,
//         email,
//       });
//       setMessage(res.data.message);
//       setTimeout(() => navigate("/login"), 2500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Error resetting password");
//     }
//   };

//   return (
//     <div
//       className="
//         min-h-screen 
//         flex items-center justify-center 
//         bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] 
//         px-3 sm:px-6 
//         py-16 sm:py-20 
//         mt-12 sm:mt-0
//         font-['Poppins']
//       "
//     >
//       <div
//         className="
//           w-full max-w-md 
//           bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 
//           border border-[#d4af37]/30 
//           backdrop-blur-xl 
//           rounded-2xl 
//           shadow-2xl 
//           p-6 sm:p-8 
//           relative
//         "
//       >
//         {/* 🟨 Header */}
//         <div className="text-center mb-5 sm:mb-6">
//           <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] shadow-lg mb-3">
//             <KeyRound size={24} className="sm:hidden" />
//             <KeyRound size={28} className="hidden sm:block" />
//           </div>
//           <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent font-['Playfair_Display']">
//             Reset Password
//           </h2>
//           <p className="text-[#f9f7e8]/70 mt-2 text-xs sm:text-sm">
//             Secure your account with a new password
//           </p>
//         </div>

//         {/* Alerts */}
//         {message && (
//           <p className="text-[#34d399] text-center mb-4 bg-[#34d399]/10 py-2 rounded-lg border border-[#34d399]/30 text-xs sm:text-sm">
//             {message}
//           </p>
//         )}
//         {error && (
//           <p className="text-red-400 text-center mb-4 bg-red-500/10 py-2 rounded-lg border border-red-500]/30 text-xs sm:text-sm">
//             {error}
//           </p>
//         )}

//         {/* 🧾 Form */}
//         <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
//           <div>
//             <label className="block text-xs sm:text-sm text-[#f9f7e8]/80 mb-1 font-medium">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="w-full bg-transparent border border-[#d4af37]/40 text-[#f9f7e8] rounded-xl px-3 sm:px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50 text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-xs sm:text-sm text-[#f9f7e8]/80 mb-1 font-medium">
//               Enter OTP
//             </label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter the 6-digit OTP"
//               className="w-full bg-transparent border border-[#d4af37]/40 text-[#f9f7e8] rounded-xl px-3 sm:px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50 text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-xs sm:text-sm text-[#f9f7e8]/80 mb-1 font-medium">
//               New Password
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="Enter new password"
//               className="w-full bg-transparent border border-[#d4af37]/40 text-[#f9f7e8] rounded-xl px-3 sm:px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50 text-sm"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-2 sm:mt-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all text-sm sm:text-base"
//           >
//             Reset Password
//           </button>
//         </form>

//         <p className="text-center mt-5 sm:mt-6 text-[#f9f7e8]/70 text-xs sm:text-sm">
//           Remembered your password?{" "}
//           <button
//             onClick={() => navigate("/login")}
//             className="text-[#d4af37] hover:underline font-medium"
//           >
//             Go to Login
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";

// ✅ Use env backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/reset-password`, {
        otp,
        newPassword,
        email,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div
      className="
        min-h-screen 
        flex items-center justify-center 
        bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] 
        px-3 sm:px-6 
        py-16 sm:py-20 
        mt-12 sm:mt-0
        font-['Poppins']
      "
    >
      <div
        className="
          w-full max-w-md 
          bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 
          border border-[#d4af37]/30 
          backdrop-blur-xl 
          rounded-2xl 
          shadow-2xl 
          p-6 sm:p-8 
          relative
        "
      >
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] shadow-lg mb-3">
            <KeyRound size={24} className="sm:hidden" />
            <KeyRound size={28} className="hidden sm:block" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent font-['Playfair_Display']">
            Reset Password
          </h2>
          <p className="text-[#f9f7e8]/70 mt-2 text-xs sm:text-sm">
            Secure your account with a new password
          </p>
        </div>

        {/* Alerts */}
        {message && (
          <p className="text-[#34d399] text-center mb-4 bg-[#34d399]/10 py-2 rounded-lg border border-[#34d399]/30 text-xs sm:text-sm">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-400 text-center mb-4 bg-red-500/10 py-2 rounded-lg border border-red-500]/30 text-xs sm:text-sm">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm text-[#f9f7e8]/80 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent border border-[#d4af37]/40 text-[#f9f7e8] rounded-xl px-3 sm:px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm text-[#f9f7e8]/80 mb-1 font-medium">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the 6-digit OTP"
              className="w-full bg-transparent border border-[#d4af37]/40 text-[#f9f7e8] rounded-xl px-3 sm:px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm text-[#f9f7e8]/80 mb-1 font-medium">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-transparent border border-[#d4af37]/40 text-[#f9f7e8] rounded-xl px-3 sm:px-4 py-2.5 focus:ring-2 focus:ring-[#d4af37] outline-none placeholder-[#f9f7e8]/50 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 sm:mt-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all text-sm sm:text-base"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center mt-5 sm:mt-6 text-[#f9f7e8]/70 text-xs sm:text-sm">
          Remembered your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#d4af37] hover:underline font-medium"
          >
            Go to Login
          </button>
        </p>
      </div>
    </div>
  );
}
