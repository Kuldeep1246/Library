import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout, auth, createUserWithEmailAndPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
