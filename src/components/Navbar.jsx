


import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bus, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-gradient-to-r from-[#0f172a]/90 via-[#1e293b]/80 to-[#0f172a]/90
        backdrop-blur-lg text-[#f9f7e8] shadow-[0_4px_30px_rgba(0,0,0,0.25)]
        border-b border-[#d4af37]/20 transition-all duration-500
      "
    >
      {/* Top bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-5 py-3">
        {/* ✅ Logo Section */}
        <Link
          to="/"
          onClick={closeMobile}
          className="flex items-center gap-2 text-2xl font-bold tracking-tight 
            bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent
            hover:opacity-90 transition"
        >
          <Bus className="w-7 h-7 text-[#d4af37]" />
          <span>TripMate</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-[0.95rem] font-medium">

          {isHomePage && (
            <Link
              to="/contact"
              className="text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors duration-200"
            >
              Contact Us
            </Link>
          )}

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors duration-200"
              >
                Dashboard
              </Link>

              <ProfileDropdown />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors duration-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 rounded-full bg-gradient-to-r 
                  from-[#d4af37]/70 to-[#b8860b]/80 text-[#0f172a] font-semibold 
                  hover:from-[#d4af37] hover:to-[#b8860b] hover:text-black 
                  shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-1.5 rounded-md text-[#f9f7e8] hover:text-[#d4af37] hover:bg-white/5 transition"
          onClick={toggleMobile}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>


      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#d4af37]/20 bg-[#020617]/95 backdrop-blur-xl relative z-0">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm">

            {isHomePage && (
              <Link
                to="/contact"
                onClick={closeMobile}
                className="py-1 text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors"
              >
                Contact Us
              </Link>
            )}

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobile}
                  className="py-1 text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  onClick={closeMobile}
                  className="py-1 text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    closeMobile();
                    logout();
                    window.location.href = "/";
                  }}
                  className="py-1 text-red-400 hover:text-red-300 transition-colors text-left"
                >
                  Logout
                </button>

              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="py-1 text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobile}
                  className="py-1 text-[#f9f7e8]/90 hover:text-[#d4af37] transition-colors"
                >
                  Register
                </Link>
                
              </>
            )}
          </div>
        </div>
      )}


      <div
        className="absolute bottom-0 left-0 w-full h-[2px] 
        bg-gradient-to-r from-[#d4af37]/60 via-[#f9f7e8]/40 to-[#d4af37]/60"
      />
    </nav>
  );
}
