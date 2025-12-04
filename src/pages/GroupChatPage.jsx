


import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { ArrowLeftCircle } from "lucide-react";

export default function GroupChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(true);

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
      {/* Main Card like other pages */}
      <div
        className="
          relative 
          w-full max-w-5xl mx-auto 
          px-3 sm:px-8 
          py-6 sm:py-8 
          mt-16 sm:mt-20 
          rounded-2xl 
          shadow-2xl 
          bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a]/95
          border border-[#d4af37]/30 
          backdrop-blur-lg
        "
      >
        {/* 🔝 Top Bar */}
        <div
          className="
            absolute 
            top-3 sm:top-5 
            left-0 
            w-full 
            px-3 sm:px-6
            flex flex-col sm:flex-row 
            items-start sm:items-center 
            justify-between 
            gap-2
          "
        >
          {/* MOBILE BACK BUTTON — ONLY ARROW */}
          <button
            onClick={() => navigate(`/trip/${id}`)}
            className="
              sm:hidden
              bg-transparent 
              text-[#d4af37] 
              p-0
            "
          >
            <ArrowLeftCircle size={18} />
          </button>

          {/* MOBILE HIDE BUTTON — BELOW ARROW */}
          <button
            onClick={() => setShowChat(!showChat)}
            className="
              sm:hidden
              w-full 
              bg-[#d4af37]/20 text-[#d4af37] 
              hover:bg-[#d4af37]/30
              px-4 py-2 
              rounded-full 
              text-sm font-medium 
              border border-[#d4af37]/40 
              backdrop-blur-md
            "
          >
            {showChat ? "Hide Chat" : "Open Chat"}
          </button>

          {/* DESKTOP HIDE CHAT BUTTON */}
          <button
            onClick={() => setShowChat(!showChat)}
            className="
              hidden sm:flex
              items-center gap-2 
              bg-[#d4af37]/20 text-[#d4af37] 
              hover:bg-[#d4af37]/30
              px-4 py-1.5 
              rounded-full 
              text-sm font-medium 
              border border-[#d4af37]/40 
              backdrop-blur-md
            "
          >
            {showChat ? "Hide Chat" : "Open Chat"}
          </button>

          {/* DESKTOP BACK BUTTON — ARROW + TEXT */}
          <button
            onClick={() => navigate(`/trip/${id}`)}
            className="
              hidden sm:flex 
              items-center gap-2 
              bg-[#d4af37]/20 text-[#d4af37] 
              hover:bg-[#d4af37]/30
              px-4 py-1.5 
              rounded-full 
              text-sm font-medium 
              border border-[#d4af37]/40 
              backdrop-blur-md
            "
          >
            <ArrowLeftCircle size={18} />
            Back
          </button>
        </div>

        {/* 🟨 Header */}
        <h1
          className="
            text-3xl sm:text-4xl 
            font-bold text-center 
            mt-16 sm:mt-20 
            mb-2 
            font-['Playfair_Display'] 
            bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] 
            bg-clip-text text-transparent
          "
        >
          Group Chat 💬
        </h1>

        <p className="text-center text-[#f9f7e8]/80 mb-6 sm:mb-8 font-['Poppins'] text-sm sm:text-base">
          Chat with your trip members and plan your adventures together in real-time.
        </p>

        {/* 💬 CHAT SECTION */}
        {showChat && (
          <div className="bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 rounded-2xl shadow-inner border border-[#d4af37]/30 p-4 sm:p-5 backdrop-blur-xl">
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar rounded-xl bg-[#faf8f6]/5 p-3 border border-[#d4af37]/10">
              <MessageList tripId={id} userId={user?._id || user?.id} />
            </div>

            <div className="mt-4 border-t border-[#d4af37]/20 pt-3 sm:pt-4">
              <MessageInput tripId={id} userId={user?._id || user?.id} />
            </div>
          </div>
        )}

        <div className="mt-10 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
      </div>
    </div>
  );
}
