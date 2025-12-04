
// import React, { useState, useEffect, useRef } from "react";
// import { Box, IconButton, Paper } from "@mui/material";
// import { FaSmile, FaPaperPlane } from "react-icons/fa";
// import EmojiPicker from "emoji-picker-react";
// import { getSocket, emitEvent } from "../socket";
// import axios from "axios";

// export default function MessageInput({ tripId, userId }) {
//   const [text, setText] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const emojiRef = useRef(null);

//   useEffect(() => {
//     setSocket(getSocket());

//     const handleClickOutside = (e) => {
//       if (emojiRef.current && !emojiRef.current.contains(e.target)) {
//         setShowEmojiPicker(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!tripId || !text.trim() || !socket) return;

//     emitEvent("sendMessage", { tripId, senderId: userId, text });
//     setText("");
//   };

//   const handleEmojiClick = (emojiData) => {
//     setText((prev) => prev + emojiData.emoji);
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file || !tripId) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await axios.post("http://localhost:5000/api/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const imageUrl = res.data.url;

//       emitEvent("sendMessage", {
//         tripId,
//         senderId: userId,
//         text: "",
//         attachments: [{ url: imageUrl, type: "image" }],
//       });
//     } catch (err) {
//       console.error("Image upload failed:", err);
//     }
//   };

//   return (
//     <div className="mt-2 w-full">
//       <div className="w-full max-w-full">
//         <Paper
//           elevation={8}
//           sx={{
//             width: "100%",
//             p: { xs: 1, sm: 1.5 },
//             display: "flex",
//             alignItems: "center",
//             gap: { xs: 0.5, sm: 1.5 },
//             borderRadius: "20px",
//             background:
//               "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))",
//             border: "1px solid rgba(212,175,55,0.3)",
//             boxShadow:
//               "0 0 20px rgba(212,175,55,0.1), inset 0 0 10px rgba(255,255,255,0.05)",
            
//           }}
//         >
//           {/* Emoji */}
//           <div ref={emojiRef} style={{ position: "relative" }}>
//             <IconButton
//               onClick={() => setShowEmojiPicker((prev) => !prev)}
//               sx={{
//                 color: "#d4af37",
//                 padding: { xs: "2px", sm: "8px" },
//                 "&:hover": { color: "#f5d76e", transform: "scale(1.05)" },
//                 transition: "all 0.2s",
//               }}
//             >
//               <FaSmile size={16} className="sm:size-5" />
//             </IconButton>

//             {showEmojiPicker && (
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "50px",
//                   left: 0,
//                   zIndex: 1000,
//                   transform: "scale(0.75)",
//                   transformOrigin: "bottom left",
//                   borderRadius: "12px",
//                   overflow: "hidden",
//                   boxShadow: "0 0 20px rgba(212,175,55,0.2)",
//                 }}
//               >
//                 <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
//               </div>
//             )}
//           </div>

//           {/* Camera */}
//           <input
//             type="file"
//             accept="image/*"
//             id="fileInput"
//             style={{ display: "none" }}
//             onChange={handleImageUpload}
//           />
//           <label htmlFor="fileInput">
//             <IconButton
//               component="span"
//               sx={{
//                 color: "#f9f7e8",
//                 padding: { xs: "2px", sm: "8px" },
//                 "&:hover": { color: "#d4af37", transform: "scale(1.05)" },
//                 transition: "all 0.2s",
//               }}
//             >
//               <span className="text-base sm:text-xl">📷</span>
//             </IconButton>
//           </label>

//           {/* Input + Send */}
//           <Box
//             component="form"
//             onSubmit={sendMessage}
//             sx={{
//               flex: 1,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               backgroundColor: "rgba(15,23,42,0.6)",
//               borderRadius: "16px",
//               border: "1px solid rgba(212,175,55,0.2)",
//               padding: { xs: "8px 10px", sm: "6px 12px" },
//               minWidth: 0, 
//             }}
//           >
//             <input
//               type="text"
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Type a message..."
//               style={{
//                 flex: 1,
//                 minWidth: 0,
//                 background: "transparent",
//                 border: "none",
//                 outline: "none",
//                 color: "#f9f7e8",
//                 fontSize: "0.9rem",
//                 padding: 0,
//               }}
//             />

//             <IconButton
//               type="submit"
//               sx={{
//                 color: "#0f172a",
//                 background: "linear-gradient(90deg, #d4af37, #b8860b)",
//                 padding: { xs: "6px", sm: "8px" },
//                 "&:hover": {
//                   boxShadow: "0 0 10px rgba(212,175,55,0.6)",
//                   transform: "scale(1.1)",
//                 },
//                 transition: "all 0.3s ease",
//                 borderRadius: "50%",
//               }}
//             >
//               <FaPaperPlane size={16} className="sm:size-5" />
//             </IconButton>
//           </Box>
//         </Paper>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Paper } from "@mui/material";
import { FaSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { getSocket, emitEvent } from "../socket";
import axios from "axios";

export default function MessageInput({ tripId, userId }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [socket, setSocket] = useState(null);
  const emojiRef = useRef(null);

  useEffect(() => {
    setSocket(getSocket());

    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!tripId || !text.trim() || !socket) return;

    emitEvent("sendMessage", { tripId, senderId: userId, text });
    setText("");
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !tripId) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = res.data.url;

      emitEvent("sendMessage", {
        tripId,
        senderId: userId,
        text: "",
        attachments: [{ url: imageUrl, type: "image" }],
      });
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  return (
    <div className="mt-2 w-full">
      <div className="w-full max-w-full">
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            p: { xs: 1, sm: 1.5 },
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1.5 },
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow:
              "0 0 20px rgba(212,175,55,0.1), inset 0 0 10px rgba(255,255,255,0.05)",
          }}
        >
          {/* Emoji */}
          <div ref={emojiRef} style={{ position: "relative" }}>
            <IconButton
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              sx={{
                color: "#d4af37",
                padding: { xs: "2px", sm: "8px" },
                "&:hover": { color: "#f5d76e", transform: "scale(1.05)" },
                transition: "all 0.2s",
              }}
            >
              <FaSmile size={16} className="sm:size-5" />
            </IconButton>

            {showEmojiPicker && (
              <div
                style={{
                  position: "absolute",
                  bottom: "50px",
                  left: 0,
                  zIndex: 1000,
                  transform: "scale(0.75)",
                  transformOrigin: "bottom left",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 0 20px rgba(212,175,55,0.2)",
                }}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
              </div>
            )}
          </div>

          {/* Camera */}
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="fileInput">
            <IconButton
              component="span"
              sx={{
                color: "#f9f7e8",
                padding: { xs: "2px", sm: "8px" },
                "&:hover": { color: "#d4af37", transform: "scale(1.05)" },
                transition: "all 0.2s",
              }}
            >
              <span className="text-base sm:text-xl">📷</span>
            </IconButton>
          </label>

          {/* Input + Send */}
          <Box
            component="form"
            onSubmit={sendMessage}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(15,23,42,0.6)",
              borderRadius: "16px",
              border: "1px solid rgba(212,175,55,0.2)",
              padding: { xs: "8px 10px", sm: "6px 12px" },
              minWidth: 0,
            }}
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                minWidth: 0,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#f9f7e8",
                fontSize: "0.9rem",
                padding: 0,
              }}
            />

            <IconButton
              type="submit"
              sx={{
                color: "#0f172a",
                background: "linear-gradient(90deg, #d4af37, #b8860b)",
                padding: { xs: "6px", sm: "8px" },
                "&:hover": {
                  boxShadow: "0 0 10px rgba(212,175,55,0.6)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
                borderRadius: "50%",
              }}
            >
              <FaPaperPlane size={16} className="sm:size-5" />
            </IconButton>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
