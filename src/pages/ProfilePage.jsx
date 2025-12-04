


// import { useAuth } from "../context/AuthContext";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Mail, MapPin, Edit3, Save, X, ArrowLeftCircle } from "lucide-react";

// export default function ProfilePage() {
//   const { user, token, setUser } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     memberSince: "—",
//     tripsJoined: 0,
//     tripsCreated: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/users/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStats(res.data);
//       } catch (err) {
//         console.error("Failed to fetch user stats:", err);
//       }
//     };

//     if (token) fetchStats();
//   }, [token]);

//   const handleUpdate = async () => {
//     if (!name.trim() || !email.trim()) {
//       alert("Name and email cannot be empty.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setSuccess("");
//       const res = await axios.put(
//         "http://localhost:5000/api/users/update",
//         { name, email },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data) {
//         setUser(res.data);
//         setSuccess("✅ Profile updated successfully!");
//         setIsEditing(false);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f172a] mt-14 sm:mt-10 via-[#1e293b] to-[#faf8f6] py-14 sm:py-16 px-3 sm:px-4 font-['Poppins']">
//       <div className="max-w-3xl mx-auto bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative">
//         {/* 🔙 Back Buttons now INSIDE card */}

//         {/* Mobile: ONLY arrow icon (top-left of card) */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 left-4 p-0 text-[#d4af37] sm:hidden"
//         >
//           <ArrowLeftCircle size={26} />
//         </button>

//         {/* Desktop/Tablet: Full back button (top-right of card) */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-4 right-4 hidden sm:flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium transition-all border border-[#d4af37]/40 backdrop-blur-md"
//         >
//           <ArrowLeftCircle size={18} />
//           Back
//         </button>

//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 mb-6 mt-6 sm:mt-8">
//           {/* Avatar */}
//           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center text-[#0f172a] text-3xl font-bold shadow-inner">
//             {user?.name?.charAt(0)?.toUpperCase() || "U"}
//           </div>

//           {/* Name + Email */}
//           <div className="text-center sm:text-left">
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#f9f7e8] flex items-center gap-2 justify-center sm:justify-start font-['Playfair_Display']">
//               {user?.name || "Unnamed User"}
//             </h1>

//             <p className="flex items-center justify-center sm:justify-start text-[#f9f7e8]/70 gap-2 mt-1 text-sm">
//               <Mail className="w-4 h-4 flex-shrink-0" />
//               <span className="break-all max-w-[250px] sm:max-w-none">
//                 {user?.email || "No email"}
//               </span>
//             </p>
//           </div>

//           {/* ✏ Desktop Edit Profile Button */}
//           <button
//             onClick={() => setIsEditing(true)}
//             className="hidden sm:flex bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition items-center gap-1 font-medium ml-auto"
//           >
//             <Edit3 className="w-4 h-4" /> Edit Profile
//           </button>
//         </div>

//         {/* ✏ Mobile-only small Edit icon */}
//         <div className="flex justify-center mb-4 sm:hidden">
//           <button
//             onClick={() => setIsEditing(true)}
//             className="p-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] shadow-md hover:shadow-lg transition"
//           >
//             <Edit3 className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Account Info */}
//         <div className="border-t border-[#d4af37]/30 pt-5 sm:pt-6">
//           <h2 className="text-xl font-semibold text-[#d4af37] mb-3 font-['Playfair_Display']">
//             Account Overview
//           </h2>
//           <ul className="space-y-3 text-[#f9f7e8]/90 text-sm sm:text-base">
//             <li className="flex items-center gap-2">
//               <MapPin className="w-4 h-4 text-[#d4af37]" />
//               <span>
//                 Member since: <strong>{stats.memberSince}</strong>
//               </span>
//             </li>
//             <li>
//               <span>Trips Joined: </span>
//               <strong>{stats.tripsJoined}</strong>
//             </li>
//             <li>
//               <span>Trips Created: </span>
//               <strong>{stats.tripsCreated}</strong>
//             </li>
//           </ul>
//         </div>

//         {success && (
//           <p className="mt-4 text-[#34d399] text-sm font-medium bg-[#34d399]/10 p-2 rounded-lg text-center border border-[#34d399]/30">
//             {success}
//           </p>
//         )}
//       </div>

//       {/* ✨ Edit Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
//           <div className="bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl shadow-xl p-6 w-full max-w-md text-[#f9f7e8]">
//             <h3 className="text-2xl font-semibold mb-4 text-[#d4af37] font-['Playfair_Display']">
//               Edit Profile
//             </h3>

//             <label className="block text-sm mb-1 text-[#f9f7e8]/80">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border border-[#d4af37]/40 rounded-lg p-2 w-full mb-4 bg-transparent text-[#f9f7e8] focus:ring-2 focus:ring-[#d4af37] outline-none"
//             />

//             <label className="block text-sm mb-1 text-[#f9f7e8]/80">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border border-[#d4af37]/40 rounded-lg p-2 w-full mb-6 bg-transparent text-[#f9f7e8] focus:ring-2 focus:ring-[#d4af37] outline-none"
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="flex items-center gap-1 px-4 py-2 bg-[#faf8f6]/10 text-[#f9f7e8]/80 rounded-lg hover:bg-[#faf8f6]/20 transition"
//               >
//                 <X className="w-4 h-4" /> Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 disabled={loading}
//                 className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
//               >
//                 {loading ? "Saving..." : <Save className="w-4 h-4" />}
//                 {loading ? "" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Edit3, Save, X, ArrowLeftCircle } from "lucide-react";

// ✅ Use env backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProfilePage() {
  const { user, token, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    memberSince: "—",
    tripsJoined: 0,
    tripsCreated: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/users/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch user stats:", err);
      }
    };

    if (token) fetchStats();
  }, [token]);

  const handleUpdate = async () => {
    if (!name.trim() || !email.trim()) {
      alert("Name and email cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setSuccess("");
      const res = await axios.put(
        `${BACKEND_URL}/api/users/update`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        setUser(res.data);
        setSuccess("✅ Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] mt-14 sm:mt-10 via-[#1e293b] to-[#faf8f6] py-14 sm:py-16 px-3 sm:px-4 font-['Poppins']">
      <div className="max-w-3xl mx-auto bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative">
        {/* 🔙 Back Buttons now INSIDE card */}

        {/* Mobile: ONLY arrow icon (top-left of card) */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-0 text-[#d4af37] sm:hidden"
        >
          <ArrowLeftCircle size={26} />
        </button>

        {/* Desktop/Tablet: Full back button (top-right of card) */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 hidden sm:flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium transition-all border border-[#d4af37]/40 backdrop-blur-md"
        >
          <ArrowLeftCircle size={18} />
          Back
        </button>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 mb-6 mt-6 sm:mt-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] flex items-center justify-center text-[#0f172a] text-3xl font-bold shadow-inner">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* Name + Email */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#f9f7e8] flex items-center gap-2 justify-center sm:justify-start font-['Playfair_Display']">
              {user?.name || "Unnamed User"}
            </h1>

            <p className="flex items-center justify-center sm:justify-start text-[#f9f7e8]/70 gap-2 mt-1 text-sm">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="break-all max-w-[250px] sm:max-w-none">
                {user?.email || "No email"}
              </span>
            </p>
          </div>

          {/* ✏ Desktop Edit Profile Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="hidden sm:flex bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition items-center gap-1 font-medium ml-auto"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        {/* ✏ Mobile-only small Edit icon */}
        <div className="flex justify-center mb-4 sm:hidden">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] shadow-md hover:shadow-lg transition"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        {/* Account Info */}
        <div className="border-t border-[#d4af37]/30 pt-5 sm:pt-6">
          <h2 className="text-xl font-semibold text-[#d4af37] mb-3 font-['Playfair_Display']">
            Account Overview
          </h2>
          <ul className="space-y-3 text-[#f9f7e8]/90 text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <span>
                Member since: <strong>{stats.memberSince}</strong>
              </span>
            </li>
            <li>
              <span>Trips Joined: </span>
              <strong>{stats.tripsJoined}</strong>
            </li>
            <li>
              <span>Trips Created: </span>
              <strong>{stats.tripsCreated}</strong>
            </li>
          </ul>
        </div>

        {success && (
          <p className="mt-4 text-[#34d399] text-sm font-medium bg-[#34d399]/10 p-2 rounded-lg text-center border border-[#34d399]/30">
            {success}
          </p>
        )}
      </div>

      {/* ✨ Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl shadow-xl p-6 w-full max-w-md text-[#f9f7e8]">
            <h3 className="text-2xl font-semibold mb-4 text-[#d4af37] font-['Playfair_Display']">
              Edit Profile
            </h3>

            <label className="block text-sm mb-1 text-[#f9f7e8]/80">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-[#d4af37]/40 rounded-lg p-2 w-full mb-4 bg-transparent text-[#f9f7e8] focus:ring-2 focus:ring-[#d4af37] outline-none"
            />

            <label className="block text-sm mb-1 text-[#f9f7e8]/80">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#d4af37]/40 rounded-lg p-2 w-full mb-6 bg-transparent text-[#f9f7e8] focus:ring-2 focus:ring-[#d4af37] outline-none"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1 px-4 py-2 bg-[#faf8f6]/10 text-[#f9f7e8]/80 rounded-lg hover:bg-[#faf8f6]/20 transition"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? "Saving..." : <Save className="w-4 h-4" />}
                {loading ? "" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
