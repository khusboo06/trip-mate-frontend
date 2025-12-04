


import React, { useEffect, useState, useRef } from "react";
import { getSocket } from "../socket";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function MessageList({ tripId, userId }) {
  const [messages, setMessages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null); 
  const chatBoxRef = useRef(null);

  // 🔽 Helper to normalize URL (handles "/uploads/.." vs full http)
  const getFullUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${BACKEND_URL}${url}`;
  };

  // 🔽 Robust download function using blob
  const handleDownloadImage = async (url) => {
    try {
      const fullUrl = getFullUrl(url);
      const response = await fetch(fullUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      const objectUrl = window.URL.createObjectURL(blob);
      link.href = objectUrl;
      link.download = "trip-image.jpg"; 
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("❌ Error downloading image:", err);
      alert("Failed to download image");
    }
  };

  useEffect(() => {
    if (!tripId) return;

    const socket = getSocket();

    if (!socket) {
      console.warn(
        "⚠️ Socket not connected yet in MessageList. Make sure connectSocket(token) is called after login."
      );
      return;
    }

    const joinTrip = () => {
      socket.emit("joinTrip", { tripId });
    };

    if (socket.connected) {
      joinTrip();
    } else {
      socket.on("connect", joinTrip);
    }

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKEND_URL}/api/messages/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("connect", joinTrip);
    };
  }, [tripId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* MAIN CHAT CARD */}
      <div className="flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl border border-[#d4af37]/30 shadow-xl relative overflow-visible">

        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 via-transparent to-[#b8860b]/10 blur-2xl -z-10" />

        {/* Header */}
        <div className="px-6 py-3 border-b border-[#d4af37]/30 bg-[#1e293b]/60 backdrop-blur-md text-[#d4af37] font-semibold text-lg flex justify-center items-center">
          💬 Trip Group Chat
        </div>

        {/* Messages area */}
        <div
          ref={chatBoxRef}
          className="flex flex-col h-[480px] p-5 overflow-y-auto scroll-smooth bg-[#0f172a]/60 backdrop-blur-md"
        >
          {messages.length === 0 ? (
            <p className="text-center text-[#f9f7e8]/50 italic mt-4">
              No messages yet. Start chatting ✨
            </p>
          ) : (
            messages.map((msg) => {
              const isMe =
                msg.sender._id === userId || msg.sender._id === userId?._id;

              return (
                <div
                  key={msg._id}
                  className={`flex flex-col mb-3 ${
                    isMe ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed shadow-md break-words ${
                      isMe
                        ? "bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] rounded-br-none"
                        : "bg-[#1e293b]/70 text-[#f9f7e8] border border-[#d4af37]/30 rounded-bl-none"
                    }`}
                  >
                    {/* Sender name (others only) */}
                    {!isMe && (
                      <p className="font-semibold text-xs mb-1 text-[#d4af37]/80">
                        {msg.sender.name}
                      </p>
                    )}

                    {/* Text */}
                    {msg.text && <p>{msg.text}</p>}

                    {/* Attachments (images) */}
                    {msg.attachments?.length > 0 &&
                      msg.attachments.map((file, i) => {
                        const fullUrl = getFullUrl(file.url);
                        return (
                          <div key={i} className="mt-2">
                            <img
                              src={fullUrl}
                              alt="Attachment"
                              className="
                                rounded-lg 
                                border border-[#d4af37]/30 
                                shadow-lg 
                                max-w-full 
                                h-auto 
                                cursor-pointer
                              "
                              onClick={() => setPreviewImage(fullUrl)}
                            />
                            <button
                              className="mt-1 text-[11px] underline text-[#f9f7e8]/80 hover:text-[#d4af37]"
                              onClick={() => handleDownloadImage(file.url)}
                            >
                              ⬇ Download image
                            </button>
                          </div>
                        );
                      })}

                    {/* Time */}
                    <span
                      className={`text-[10px] block mt-1 text-right ${
                        isMe ? "text-[#0f172a]/70" : "text-[#f9f7e8]/50"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer note */}
        <div className="py-2 text-center text-xs text-[#f9f7e8]/50 border-t border-[#d4af37]/20 bg-[#1e293b]/60">
          Messages are end-to-end encrypted 🔒
        </div>
      </div>

      {/* 🔍 IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div
          className="
            fixed inset-0 
            bg-black/70 
            z-50 
            flex items-center justify-center
            px-3
          "
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-[#020617] border border-[#d4af37]/40 rounded-2xl shadow-2xl max-w-3xl w-full p-4 sm:p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[70vh] w-full object-contain rounded-xl"
            />

            <div className="mt-4 flex flex-col sm:flex-row justify-between gap-3">
              <button
                className="
                  px-4 py-2 rounded-full 
                  bg-[#1e293b] 
                  text-[#f9f7e8] 
                  text-sm
                  hover:bg-[#0f172a]
                  border border-[#d4af37]/40
                "
                onClick={() => setPreviewImage(null)}
              >
                ✖ Close
              </button>

              <button
                onClick={() => handleDownloadImage(previewImage)}
                className="
                  px-4 py-2 rounded-full 
                  bg-gradient-to-r from-[#d4af37] to-[#b8860b]
                  text-[#0f172a]
                  text-sm font-semibold
                  text-center
                  hover:shadow-[0_0_15px_rgba(212,175,55,0.6)]
                "
              >
                ⬇ Download Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
