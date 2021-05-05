import React from "react";
import { Navigate } from "react-router-dom";
import { Token } from "../../data/useToken";

interface LogoutProps {
  setToken: (token: Token) => void;
}

export const Logout: React.FC<LogoutProps> = ({ setToken }) => {
  setToken({ token: "" });

  return <Navigate to="/authenticate" />;
};
