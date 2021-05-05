import { ThemeProvider } from "@material-ui/core";
import React, { FC } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import { Logout } from "./components/Logout/Logout";
import DashboardLayout from "./components/View/DashboardLayout";
import GlobalStyles from "./components/View/GlobalStyles";
import MainLayout from "./components/View/MainLayout";
import useToken from "./data/useToken";
import Account from "./Pages/Account";
import Dashboard from "./Pages/Dashboard";
import Transactions from "./Pages/Transactions";
import theme from "./theme";

// type setToken = (userToken: Token) => void;

const Routes: FC = () => {
  const [token, setToken] = useToken();

  const routing = useRoutes([
    {
      path: "/app",
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element:
            token.length === 0 ? (
              <Navigate to="/authenticate" />
            ) : (
              <Dashboard token={token} />
            ),
        },
        {
          path: "account",
          element:
            token.length === 0 ? (
              <Navigate to="/authenticate" />
            ) : (
              <Account token={token} />
            ),
        },
        {
          path: "transactions",
          element:
            token.length === 0 ? (
              <Navigate to="/authenticate" />
            ) : (
              <Transactions token={token} />
            ),
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element:
            token.length === 0 ? (
              <Navigate to="/authenticate" />
            ) : (
              <Navigate to="/app/dashboard" />
            ),
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "authenticate",
          element:
            token.length !== 0 ? (
              <Navigate to="/" />
            ) : (
              <Authentication setToken={setToken} />
            ),
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "logout",
          element: <Logout setToken={setToken} />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default Routes;
