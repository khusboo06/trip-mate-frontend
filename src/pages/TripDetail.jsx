


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
//   MessageCircle,
//   Map,
//   DollarSign,
//   Vote,
//   RefreshCcw,
//   ImageIcon,
//   ArrowLeftCircle,
// } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// export default function TripDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [trip, setTrip] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchTrip = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/api/trips/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTrip(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching trip:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrip();
//   }, [id, token]);

//   if (loading)
//     return (
//       <p className="text-center mt-20 text-[#d4af37] font-medium tracking-wide animate-pulse">
//         Loading your adventure details...
//       </p>
//     );

//   if (!trip)
//     return (
//       <p className="text-center mt-20 text-red-500 font-semibold">
//         Trip not found!
//       </p>
//     );

//   const features = [
//     {
//       title: "Polls",
//       desc: "Create and vote on trip decisions.",
//       icon: <Vote className="w-8 h-8 text-white" />,
//       route: `/trips/${id}/polls`,
//       color: "from-[#d4af37] to-[#b8860b]",
//     },
//     {
//       title: "Gallery",
//       desc: "Share and download trip photos.",
//       icon: <ImageIcon className="w-8 h-8 text-white" />,
//       route: `/trips/${id}/gallery`,
//       color: "from-[#c084fc] to-[#9333ea]",
//     },
//     {
//       title: "Expenses",
//       desc: "Track and split expenses among your group.",
//       icon: <DollarSign className="w-8 h-8 text-white" />,
//       route: `/trips/${id}/expenses`,
//       color: "from-[#0f172a] to-[#334155]",
//     },
//     {
//       title: "Map & Weather",
//       desc: "View live weather and maps for your destination.",
//       icon: <Map className="w-8 h-8 text-white" />,
//       route: `/trips/${id}/map-weather`,
//       color: "from-[#22c55e] to-[#bef264]",
//     },
//     {
//       title: "Currency Converter",
//       desc: "Easily compare and convert currencies.",
//       icon: <RefreshCcw className="w-8 h-8 text-white" />,
//       route: `/trips/${id}/currency-converter`,
//       color: "from-[#06b6d4] to-[#67e8f9]",
//     },
//     {
//       title: "Group Chat",
//       desc: "Chat with your travel mates in real time.",
//       icon: <MessageCircle className="w-8 h-8 text-white" />,
//       route: `/trips/${id}/chat`,
//       color: "from-[#ec4899] to-[#3b82f6]",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] px-3 sm:px-6 py-16 mt-16 sm:mt-20 font-['Poppins'] relative">
//       {/* 🔙 Mobile: only arrow icon (top-left) */}
//       <button
//         onClick={() => navigate("/dashboard")}
//         className="absolute top-5 left-5 p-0 text-[#d4af37] sm:hidden"
//       >
//         <ArrowLeftCircle size={26} />
//       </button>

//       {/* 🔙 Desktop/Tablet: pill Back button (top-right) */}
//       <button
//         onClick={() => navigate("/dashboard")}
//         className="absolute top-6 right-6 hidden sm:flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium border border-[#d4af37]/40 backdrop-blur-md transition-all"
//       >
//         <ArrowLeftCircle size={18} />
//         Back
//       </button>

//       {/* 🧭 Trip Header */}
//       <div className="text-center mb-12 sm:mb-14 px-2">
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent font-['Playfair_Display']">
//           {trip.title}
//         </h1>
//         <p className="text-[#f9f7e8]/80 mt-3 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
//           {trip.description || "No description provided for this trip."}
//         </p>
//         <div className="mt-4 flex justify-center items-center gap-2 text-[#d4af37]/80 text-xs sm:text-sm">
//           <span>📍 Destination:</span>
//           <span className="font-semibold">{trip.destination || "N/A"}</span>
//         </div>
//       </div>

//       {/* ✨ Features Grid */}
//       <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
//         {features.map((feature, idx) => (
//           <Link
//             key={idx}
//             to={feature.route}
//             className={`group bg-gradient-to-br ${feature.color} p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300`}
//           >
//             <div className="flex flex-col items-start space-y-3">
//               <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition">
//                 {feature.icon}
//               </div>
//               <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
//                 {feature.title}
//               </h3>
//               <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
//                 {feature.desc}
//               </p>
//               <button className="mt-3 sm:mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white transition-all">
//                 Explore {feature.title}
//               </button>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Decorative Glow */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-[60%] h-[400px] bg-[#d4af37]/10 blur-[180px]" />
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MessageCircle,
  Map,
  DollarSign,
  Vote,
  RefreshCcw,
  ImageIcon,
  ArrowLeftCircle,
} from "lucide-react";

// ✅ Use ENV backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrip(res.data);
      } catch (err) {
        console.error("❌ Error fetching trip:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id, token]);

  if (loading)
    return (
      <p className="text-center mt-20 text-[#d4af37] font-medium tracking-wide animate-pulse">
        Loading your adventure details...
      </p>
    );

  if (!trip)
    return (
      <p className="text-center mt-20 text-red-500 font-semibold">
        Trip not found!
      </p>
    );

  const features = [
    {
      title: "Polls",
      desc: "Create and vote on trip decisions.",
      icon: <Vote className="w-8 h-8 text-white" />,
      route: `/trips/${id}/polls`,
      color: "from-[#d4af37] to-[#b8860b]",
    },
    {
      title: "Gallery",
      desc: "Share and download trip photos.",
      icon: <ImageIcon className="w-8 h-8 text-white" />,
      route: `/trips/${id}/gallery`,
      color: "from-[#c084fc] to-[#9333ea]",
    },
    {
      title: "Expenses",
      desc: "Track and split expenses among your group.",
      icon: <DollarSign className="w-8 h-8 text-white" />,
      route: `/trips/${id}/expenses`,
      color: "from-[#0f172a] to-[#334155]",
    },
    {
      title: "Map & Weather",
      desc: "View live weather and maps for your destination.",
      icon: <Map className="w-8 h-8 text-white" />,
      route: `/trips/${id}/map-weather`,
      color: "from-[#22c55e] to-[#bef264]",
    },
    {
      title: "Currency Converter",
      desc: "Easily compare and convert currencies.",
      icon: <RefreshCcw className="w-8 h-8 text-white" />,
      route: `/trips/${id}/currency-converter`,
      color: "from-[#06b6d4] to-[#67e8f9]",
    },
    {
      title: "Group Chat",
      desc: "Chat with your travel mates in real time.",
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      route: `/trips/${id}/chat`,
      color: "from-[#ec4899] to-[#3b82f6]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] px-3 sm:px-6 py-16 mt-14 sm:mt-[-5px] font-['Poppins'] relative">
      {/* 🔙 Mobile: only arrow icon (top-left) */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-5 left-5 p-0 text-[#d4af37] sm:hidden"
      >
        <ArrowLeftCircle size={26} />
      </button>

      {/* 🔙 Desktop/Tablet: pill Back button (top-right) */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-14 right-6 hidden sm:flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium border border-[#d4af37]/40 backdrop-blur-md transition-all"
      >
        <ArrowLeftCircle size={18} />
        Back
      </button>

      {/* 🧭 Trip Header */}
      <div className="text-center mb-12 sm:mb-14 px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent font-['Playfair_Display']">
          {trip.title}
        </h1>
        <p className="text-[#f9f7e8]/80 mt-3 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {trip.description || "No description provided for this trip."}
        </p>
        <div className="mt-4 flex justify-center items-center gap-2 text-[#d4af37]/80 text-xs sm:text-sm">
          <span>📍 Destination:</span>
          <span className="font-semibold">{trip.destination || "N/A"}</span>
        </div>
      </div>

      {/* ✨ Features Grid */}
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <Link
            key={idx}
            to={feature.route}
            className={`group bg-gradient-to-br ${feature.color} p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300`}
          >
            <div className="flex flex-col items-start space-y-3">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {feature.desc}
              </p>
              <button className="mt-3 sm:mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white transition-all">
                Explore {feature.title}
              </button>
            </div>
          </Link>
        ))}
      </div>

      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-[60%] h-[400px] bg-[#d4af37]/10 blur-[180px]" />
      </div>
    </div>
  );
}
