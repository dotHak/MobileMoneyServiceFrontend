import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Authentication from "../Authentication/Authentication";
import useToken from "./useToken";

const App = () => {
    const [token, setToken] = useToken();

    if (!token) {
        return <Authentication setToken={setToken} />;
    }
    return (
        <div className="App">
            <h1>Mobile Monney Service</h1>
            <Router>
                <Switch>
                    <Route>
                        <Dashboard />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
