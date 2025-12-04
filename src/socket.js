// import { io } from "socket.io-client";

// let socket = null;

// /**
//  * Connects the socket with the given JWT token
//  * @param {string} token
//  */
// export const connectSocket = (token) => {
//   if (!token) {
//     console.warn("❌ No token provided. Socket will not authenticate.");
//     return;
//   }

//   // Disconnect existing socket if any
//   if (socket) {
//     socket.disconnect();
//   }

//   // Initialize new socket connection
//   socket = io("http://localhost:5000", {
//     transports: ["websocket"],
//     withCredentials: true,
//     auth: { token },
//   });

//   socket.on("connect", () => {
//     console.log("✅ Socket connected:", socket.id);
//   });

//   socket.on("disconnect", (reason) => {
//     console.log("⚡ Socket disconnected:", reason);
//   });

//   socket.on("connect_error", (err) => {
//     console.error("❌ Socket connection error:", err.message);
//   });
// };

// /**
//  * Disconnects the current socket
//  */
// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//     console.log("⚡ Socket disconnected manually");
//   }
// };

// /**
//  * Get the current socket instance
//  * @returns {Socket | null}
//  */
// export const getSocket = () => socket;

// /**
//  * Safe emit function
//  * @param {string} event
//  * @param {any} payload
//  */
// export const emitEvent = (event, payload) => {
//   if (socket && socket.connected) {
//     socket.emit(event, payload);
//   } else {
//     console.warn(`⚠️ Cannot emit '${event}' - socket not connected yet.`);
//   }
// };




import { io } from "socket.io-client";

let socket = null;

// Base URL from Vite environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Connects the socket with the given JWT token
 * @param {string} token
 */
export const connectSocket = (token) => {
  if (!token) {
    console.warn("❌ No token provided. Socket will not authenticate.");
    return;
  }

  // If already connected, disconnect first
  if (socket) {
    socket.disconnect();
  }

  // Create new socket connection
  socket = io(BACKEND_URL, {
    transports: ["websocket"],
    withCredentials: true,
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("⚡ Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });
};

/**
 * Disconnects the current socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("⚡ Socket disconnected manually");
  }
};

/**
 * Returns active socket
 */
export const getSocket = () => socket;

/**
 * Safe emit wrapper
 */
export const emitEvent = (event, payload) => {
  if (socket && socket.connected) {
    socket.emit(event, payload);
  } else {
    console.warn(`⚠️ Cannot emit '${event}' - socket NOT connected yet.`);
  }
};
