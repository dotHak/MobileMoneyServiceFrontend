import { Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardLayout from "./components/View/DashboardLayout";
import MainLayout from "./components/View/MainLayout";
import Account from "./Pages/Account";
import Transactions from "./Pages/Transactions";

const routes = (token: string) => {
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
                { path: "/", element: <Navigate to="/app/dashboard" /> },
            ],
        },
    ];
};

export default routes;
