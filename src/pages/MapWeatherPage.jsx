



import { useNavigate } from "react-router-dom";
import MapWeatherPanel from "../components/MapWeatherPanel";
import { ArrowLeftCircle } from "lucide-react";

export default function MapWeatherPage() {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative min-h-screen 
        text-[#f9f7e8]
        bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6]
        px-3 sm:px-6 py-12
      "
    >
      {/* Main card like other pages */}
      <div
        className="
          relative 
          w-full max-w-6xl mx-auto 
          px-3 sm:px-6 
          py-6 sm:py-8 
          mt-6 sm:mt-16
          rounded-2xl 
          shadow-2xl 
          border border-[#d4af37]/30 
          bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a]/95
          backdrop-blur-md
        "
      >
        {/* 🔙 Back buttons */}

        {/* Mobile arrow */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute 
            top-3 left-3 
            p-0 
            bg-transparent 
            text-[#d4af37] 
            sm:hidden
          "
        >
          <ArrowLeftCircle size={22} />
        </button>

        {/* Desktop Back */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute 
            top-5 right-5 
            hidden sm:flex 
            items-center gap-2 
            bg-[#1e293b]/80 text-[#d4af37] 
            hover:text-[#f5d76e] 
            border border-[#d4af37]/40 
            hover:bg-[#d4af37]/10 
            px-3 py-1.5 
            rounded-full 
            text-sm font-medium 
            shadow-md 
            transition-all 
            hover:scale-105 
            backdrop-blur-md
          "
        >
          <ArrowLeftCircle size={20} />
          Back
        </button>

        {/* 🧭 Header Section */}
        <div className="text-center mb-8 mt-8 px-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#d4af37] mb-3 font-['Playfair_Display']">
            Trip Map & Weather 🌍
          </h1>
          <p className="text-[#f9f7e8]/80 max-w-3xl mx-auto text-sm sm:text-lg leading-relaxed font-light">
            Explore your trip destinations, visualize routes, and get live
            weather updates — all beautifully integrated.
          </p>
        </div>

        {/* Map + Weather Panel */}
        <div
          className="
            rounded-2xl 
            bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/95 
            p-4 sm:p-6 
            border border-[#d4af37]/30 
            shadow-xl 
            backdrop-blur-xl
          "
        >
          <MapWeatherPanel />
        </div>

        {/* Bottom Divider */}
        <div className="mt-10 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
      </div>
    </div>
  );
}
