import { createContext, useEffect, useState } from "react";
import { loginUser, getProfile } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {

    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const profile = await getProfile();

      setUser(profile);

    } catch (error) {

      localStorage.removeItem("access_token");

      setUser(null);

    }

    setLoading(false);

  };

  const login = async (email, password) => {

    const data = await loginUser(email, password);

    localStorage.setItem(
      "access_token",
      data.access_token
    );

    const profile = await getProfile();

    setUser(profile);

  };

  const logout = () => {

    localStorage.removeItem(
      "access_token"
    );

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};