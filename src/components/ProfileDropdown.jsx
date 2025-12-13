

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Settings, User } from "lucide-react";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // 🧠 Generate initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✨ Handle navigation
  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative z-[9999]" ref={dropdownRef}>
      {/* 👤 Avatar Button */}
      <div
        onClick={() => setOpen(!open)}
        className={`w-11 h-11 cursor-pointer rounded-full 
        bg-gradient-to-br from-[#d4af37] to-[#b8860b]
        flex items-center justify-center text-[#0f172a] font-semibold text-lg 
        shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200 
        border-[2px] border-[#f9f7e8]/80 ${open ? "ring-4 ring-[#d4af37]/30" : ""}`}
      >
        {getInitials(user?.name)}
      </div>

      {/* 🌟 Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-72 rounded-2xl shadow-2xl border border-[#d4af37]/20
          bg-gradient-to-b from-[#1e293b]/95 to-[#0f172a]/95 text-[#f9f7e8] backdrop-blur-xl z-50 
          animate-fadeIn transform transition-all duration-200"
        >
          {/* 🧑‍💼 User Info */}
          <div className="px-5 py-4 border-b border-[#d4af37]/20">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] 
                flex items-center justify-center text-[#0f172a] font-semibold text-lg shadow-inner"
              >
                {getInitials(user?.name)}
              </div>
              <div>
                <p className="font-semibold text-[#fefce8] text-base">
                  {user?.name || "Unnamed User"}
                </p>
                <p
                  className="text-sm text-[#e2e8f0]/70 truncate max-w-[200px]"
                  title={user?.email}
                >
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="mt-3 h-[2px] w-10 bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-full"></div>
          </div>

          {/* 🧭 Menu Items */}
          <div className="flex flex-col py-1">
            <button
              onClick={() => handleNavigate("/profile")}
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium 
              text-[#f9f7e8]/90 hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition"
            >
              <User className="w-4 h-4" />
              My Profile
            </button>

            {/* <button
              onClick={() => handleNavigate("/settings")}
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium 
              text-[#f9f7e8]/90 hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button> */}

            <button
              onClick={() => logout()}
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium 
              text-red-400 hover:bg-red-900/20 hover:text-red-300 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
