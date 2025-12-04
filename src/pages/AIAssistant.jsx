


// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// export default function AiAssistant({ embedded = false }) {
//   const { token } = useAuth();
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: "👋 Hi! I’m TripMate AI — how can I help plan your next adventure?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/ai/chat",
//         { message: input, context: messages },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const aiReply = { role: "assistant", content: res.data.reply };
//       setMessages((prev) => [...prev, aiReply]);
//     } catch (err) {
//       console.error("AI Chat Error:", err);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "⚠ Sorry, I couldn’t process that request. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div
//       className="
//         min-h-screen
//         w-full
//         px-3 sm:px-6 py-12
//         bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6]
//         text-[#f9f7e8]
//       "
//     >
//       <div
//         className="
//           relative 
//           w-full max-w-4xl mx-auto 
//           px-3 sm:px-6 
//           py-6 sm:py-8 
//           mt-16 sm:mt-20 
//           rounded-2xl 
//           shadow-2xl 
//           bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a]/95
//           border border-[#d4af37]/30 
//           backdrop-blur-md
//         "
//       >
//         {/* Header */}
//         {!embedded && (
//           <div className="text-center mb-6">
//             <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent font-['Playfair_Display']">
//               🤖 TripMate AI Assistant
//             </h1>
//             <p className="text-[#f9f7e8]/70 text-sm mt-2 font-['Poppins']">
//               Ask about destinations, budgets, and trip ideas — your luxury travel companion.
//             </p>
//           </div>
//         )}

//         {/* Chat Window */}
//         <div
//           className="
//             flex-1 overflow-y-auto 
//             rounded-2xl p-4 mb-4 
//             backdrop-blur-lg 
//             border border-[#d4af37]/20 
//             shadow-inner space-y-3
//             bg-gradient-to-b from-[#1e293b]/60 to-[#0f172a]/70
//             max-h-[60vh] sm:max-h-[65vh]
//           "
//         >
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`p-3 rounded-2xl shadow-md max-w-[85%] sm:max-w-[75%] text-sm sm:text-base font-['Poppins'] leading-relaxed
//                   ${
//                     msg.role === "user"
//                       ? "bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] rounded-br-none"
//                       : "bg-[#f9f7e8]/90 text-[#0f172a] rounded-bl-none border border-[#d4af37]/10"
//                   }
//                 `}
//                 style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex items-center gap-2 text-[#f9f7e8]/70 italic text-base">
//               <span className="animate-bounce">●</span>
//               <span className="animate-bounce delay-150">●</span>
//               <span className="animate-bounce delay-300">●</span>
//               <span>TripMate AI is thinking...</span>
//             </div>
//           )}

//           <div ref={chatEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className="flex flex-col sm:flex-row gap-3">
//           <textarea
//             rows="1"
//             className="
//               flex-1 w-full 
//               bg-[#f9f7e8]/90 
//               border border-[#d4af37]/30 
//               text-[#0f172a] 
//               rounded-xl p-3 
//               resize-none 
//               focus:outline-none 
//               focus:ring-2 focus:ring-[#d4af37]
//               font-['Poppins']
//             "
//             placeholder="Ask something..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             disabled={loading}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="
//               w-full sm:w-auto 
//               bg-gradient-to-r from-[#d4af37] to-[#b8860b] 
//               text-[#0f172a] font-semibold 
//               px-6 py-3 rounded-xl 
//               shadow-md hover:shadow-lg 
//               transition-all duration-200 
//               disabled:opacity-50
//               font-['Poppins']
//             "
//           >
//             Send
//           </button>
//         </div>

//         {/* Bottom Glow Divider */}
//         <div className="mt-10 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AiAssistant({ embedded = false }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I’m TripMate AI — how can I help plan your next adventure?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/ai/chat`,
        { message: input, context: messages },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiReply = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error("AI Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠ Sorry, I couldn’t process that request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
      <div
        className="
          relative 
          w-full max-w-4xl mx-auto 
          px-3 sm:px-6 
          py-6 sm:py-8 
          mt-16 sm:mt-20 
          rounded-2xl 
          shadow-2xl 
          bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a]/95
          border border-[#d4af37]/30 
          backdrop-blur-md
        "
      >
        {/* Header */}
        {!embedded && (
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent font-['Playfair_Display']">
              🤖 TripMate AI Assistant
            </h1>
            <p className="text-[#f9f7e8]/70 text-sm mt-2 font-['Poppins']">
              Ask about destinations, budgets, and trip ideas — your luxury travel companion.
            </p>
          </div>
        )}

        {/* Chat Window */}
        <div
          className="
            flex-1 overflow-y-auto 
            rounded-2xl p-4 mb-4 
            backdrop-blur-lg 
            border border-[#d4af37]/20 
            shadow-inner space-y-3
            bg-gradient-to-b from-[#1e293b]/60 to-[#0f172a]/70
            max-h-[60vh] sm:max-h-[65vh]
          "
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-2xl shadow-md max-w-[85%] sm:max-w-[75%] text-sm sm:text-base font-['Poppins'] leading-relaxed
                  ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] rounded-br-none"
                      : "bg-[#f9f7e8]/90 text-[#0f172a] rounded-bl-none border border-[#d4af37]/10"
                  }
                `}
                style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-[#f9f7e8]/70 italic text-base">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-150">●</span>
              <span className="animate-bounce delay-300">●</span>
              <span>TripMate AI is thinking...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            rows="1"
            className="
              flex-1 w-full 
              bg-[#f9f7e8]/90 
              border border-[#d4af37]/30 
              text-[#0f172a] 
              rounded-xl p-3 
              resize-none 
              focus:outline-none 
              focus:ring-2 focus:ring-[#d4af37]
              font-['Poppins']
            "
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="
              w-full sm:w-auto 
              bg-gradient-to-r from-[#d4af37] to-[#b8860b] 
              text-[#0f172a] font-semibold 
              px-6 py-3 rounded-xl 
              shadow-md hover:shadow-lg 
              transition-all duration-200 
              disabled:opacity-50
              font-['Poppins']
            "
          >
            Send
          </button>
        </div>

        {/* Bottom Glow Divider */}
        <div className="mt-10 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
      </div>
    </div>
  );
}
