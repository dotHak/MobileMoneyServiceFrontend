import { ThemeProvider } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import { Logout } from "./components/Logout/Logout";
import DashboardLayout from "./components/View/DashboardLayout";
import GlobalStyles from "./components/View/GlobalStyles";
import MainLayout from "./components/View/MainLayout";
import { AppUser, baseUrl, ErrorResponse, isAppUser } from "./data/entities";
import useToken from "./data/useToken";
import Account from "./Pages/Account";
import Dashboard from "./Pages/Dashboard";
import { Merchants } from "./Pages/Merchant";
import Transactions from "./Pages/Transactions";
import theme from "./theme";

const userUrl = baseUrl + "users";

const getUser = async (token: string) => {
  return fetch(userUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((data) => data.json());
};

const checkMerchantStatus = (appUser: AppUser): boolean => {
  let status = false;
  appUser.roles.forEach((role) => (status = role.name === "MERCHANT"));
  return status;
};

const initialUser: AppUser = {
  id: 0,
  email: "",
  enable: false,
  roles: [],
  createdDate: new Date(),
};

const getInitialData = () => {
  const userString = sessionStorage.getItem("user");
  if (!userString) {
    return initialUser;
  }
  const user: AppUser = JSON.parse(userString);
  return user;
};

const Routes: FC = () => {
  const [token, setToken] = useToken();
  const [appUser, setAppUser] = useState<AppUser>(getInitialData);
  const [isMerchant, setIsMerchant] = useState(false);

  useEffect(() => {
    getUser(token).then((data: AppUser | ErrorResponse) => {
      if (isAppUser(data)) {
        setAppUser(data);
        setIsMerchant(checkMerchantStatus(appUser));
        sessionStorage.setItem("user", JSON.stringify(data));
      }
    });
  }, [token]);
  const routing = useRoutes([
    {
      path: "/app",
      element: <DashboardLayout isMerchant={isMerchant} />,
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
              <Account
                token={token}
                isMerchant={isMerchant}
                setIsMerchant={setIsMerchant}
              />
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
        isMerchant
          ? {
              path: "merchants",
              element:
                token.length === 0 ? (
                  <Navigate to="/authenticate" />
                ) : (
                  <Merchants token={token} />
                ),
            }
          : {},
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
