
// import { createContext, useContext, useState, useEffect } from "react";
// import { connectSocket, disconnectSocket } from "../socket";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const [token, setToken] = useState(() => localStorage.getItem("token") || "");

//   // 🧩 Manage socket & token sync
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//       connectSocket(token);
//     } else {
//       localStorage.removeItem("token");
//       disconnectSocket();
//     }
//   }, [token]);

//   // 🧩 Sync user with localStorage
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   const login = (userData, jwtToken) => {
//     setUser(userData);
//     setToken(jwtToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken("");
//     disconnectSocket();
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         setUser, 
//         setToken, 
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


import { createContext, useContext, useState, useEffect } from "react";
import { connectSocket, disconnectSocket } from "../socket";
import { setToken as applyApiToken } from "../api";  // ⭐ ADD THIS

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  /* --------------------------------------------------
     ⭐ Apply token on app load (important on refresh)
  -------------------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      applyApiToken(saved);  // ⭐ Makes Axios send Authorization header
      connectSocket(saved);
    }
  }, []);

  /* --------------------------------------------------
     ⭐ Sync token changes + socket
  -------------------------------------------------- */
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      applyApiToken(token);   // ⭐ CRITICAL FIX
      connectSocket(token);
    } else {
      localStorage.removeItem("token");
      disconnectSocket();
    }
  }, [token]);

  /* --------------------------------------------------
     ⭐ Sync user to localStorage
  -------------------------------------------------- */
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  /* --------------------------------------------------
     ⭐ LOGIN FIXED VERSION
  -------------------------------------------------- */
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    applyApiToken(jwtToken);  // ⭐IMPORTANT
  };

  const logout = () => {
    setUser(null);
    setToken("");
    disconnectSocket();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
