

import { Bus } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-[#f9f7e8] border-t border-[#d4af37]/20 shadow-inner">
     
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/80 via-[#e6c85c]/60 to-[#b8860b]/70 blur-[1px]" />

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-3 text-center space-y-2">
        {/* Logo + Name */}
        <div className="flex items-center justify-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-[#d4af37]/30 to-[#b8860b]/30 rounded-full border border-[#d4af37]/20">
            <Bus className="w-4 h-4 text-[#d4af37]" />
          </div>
          <h1 className="text-sm sm:text-base font-semibold tracking-wide text-[#f9f7e8] font-['Playfair_Display']">
            TripMate
          </h1>
        </div>

        {/* Divider Line */}
        <div className="w-10 sm:w-12 h-[1px] bg-gradient-to-r from-[#d4af37] via-[#e6c85c] to-[#b8860b] opacity-80 rounded-full" />

        {/* Copyright */}
        <p className="text-[10px] sm:text-xs text-[#f9f7e8]/70 font-light tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#d4af37] font-medium">TripMate</span>. All rights reserved.
        </p>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[55%] sm:w-[50%] h-[35px] bg-[#d4af37]/10 blur-[40px] rounded-full pointer-events-none" />
    </footer>
  );
}
