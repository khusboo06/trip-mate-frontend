


import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import CurrencyConverter from "../components/CurrencyConverter";

export default function CurrencyConverterPage() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        w-full
        px-3 sm:px-6 py-12
        bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6]
        text-[#f9f7e8]
      "
    >
      {/* Main Card */}
      <div
        className="
          relative 
          w-full max-w-4xl mx-auto 
          px-3 sm:px-6 
          py-6 sm:py-8 
          mt-20 
          rounded-2xl 
          shadow-2xl 
          border border-[#d4af37]/30 
          bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a]/95
          backdrop-blur-md
        "
      >
        {/* Mobile Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute 
            top-2 left-3 
            p-0 
            rounded-full 
            text-[#d4af37] 
            bg-transparent 
            sm:hidden
          "
        >
          <ArrowLeftCircle size={18} />
        </button>

        {/* Desktop Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute 
            top-5 right-5 
            hidden sm:flex 
            items-center gap-2 
            bg-[#d4af37]/15 text-[#d4af37] 
            hover:bg-[#d4af37]/25 
            px-4 py-2
            rounded-full 
            text-sm 
            font-medium 
            transition-all duration-300 
            backdrop-blur-md 
            border border-[#d4af37]/30
          "
        >
          <ArrowLeftCircle size={18} />
          Back
        </button>

        {/* Title */}
        <div className="text-center mb-8 sm:mb-10">
          <h1
            className="
              text-3xl sm:text-4xl 
              font-bold font-['Playfair_Display'] 
              bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] 
              bg-clip-text text-transparent 
              mb-3
            "
          >
            Currency Converter 💱
          </h1>

          <p className="text-[#f9f7e8]/80 font-['Poppins'] max-w-2xl mx-auto text-sm sm:text-base px-1 sm:px-0">
            Instantly convert between global currencies to manage your trip expenses — 
            elegantly and efficiently.
          </p>
        </div>

        {/* ❌ Removed EXTRA DIV — Component directly placed */}
        <CurrencyConverter />

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/30 to-[#d4af37]/40" />
      </div>
    </div>
  );
}
