// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456",
    },
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  const register = (name, email, password) => {
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      return { success: false, message: "Email đã tồn tại!" };
    }

    const newUser = { name, email, password };
    setUsers((prev) => [...prev, newUser]);
    return { success: true, message: "Đăng ký thành công!" };
  };

  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: "Sai email hoặc mật khẩu!" };
    }

    setCurrentUser(user);
    return { success: true, message: "Đăng nhập thành công!" };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};