import React, { useContext } from "react";
import { AuthContext } from "./Context/Context";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRouter;