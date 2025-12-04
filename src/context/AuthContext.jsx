
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
import { setToken as applyAxiosToken } from "../api";   // ⭐ IMPORTANT

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Sync token with socket + axios
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      // ⭐ Tell Axios to include this token in every request
      applyAxiosToken(token);

      connectSocket(token);
    } else {
      localStorage.removeItem("token");

      // ⭐ Remove token from Axios headers
      applyAxiosToken("");

      disconnectSocket();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    // ⭐ MUST: Add token to axios headers
    applyAxiosToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");

    // ⭐ Remove token from axios headers
    applyAxiosToken("");

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
