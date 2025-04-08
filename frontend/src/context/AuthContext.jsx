import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [activity, setActivity] = useState(() => {
    const stored = localStorage.getItem("userActivity");
    return stored ? JSON.parse(stored) : [];
  });

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userActivity");
    setUser(null);
    setActivity([]);
  };

  const trackActivity = (action) => {
    const newActivity = [...activity, { action, time: new Date().toLocaleString() }];
    setActivity(newActivity);
    localStorage.setItem("userActivity", JSON.stringify(newActivity));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, activity, trackActivity }}>
      {children}
    </AuthContext.Provider>
  );
};
