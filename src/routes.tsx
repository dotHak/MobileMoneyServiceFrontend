import { Navigate } from "react-router-dom";
import { Token } from "./components/App/useToken";
import Authentication from "./components/Authentication/Authentication";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardLayout from "./components/View/DashboardLayout";
import MainLayout from "./components/View/MainLayout";
import Account from "./Pages/Account";
import Transactions from "./Pages/Transactions";

type setToken = (userToken: Token) => void;

const routes = (token: string, setToken: setToken, isNewSession: boolean) => {
    return [
        {
            path: "/app",
            element: <DashboardLayout />,
            children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "account", element: <Account token={token} /> },
                {
                    path: "transactions",
                    element: <Transactions token={token} />,
                },
            ],
        },
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <Navigate to="/app/dashboard" />,
                },
            ],
        },
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "signin",
                    element: (
                        <Authentication
                            setToken={setToken}
                            isNewSession={isNewSession}
                        />
                    ),
                },
            ],
        },
    ];
};

export default routes;
