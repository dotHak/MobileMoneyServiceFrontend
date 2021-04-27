import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import "./App.css";

import GlobalStyles from "./components/View/GlobalStyles";
import Authentication from "./components/Authentication/Authentication";
import useToken from "./components/App/useToken";

import theme from "./theme";
import routes from "./routes";

const App = () => {
    const [token, setToken] = useToken();
    const routing = useRoutes(routes(token, setToken, false));

    if (!token) {
        return <Authentication setToken={setToken} isNewSession={true} />;
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {routing}
        </ThemeProvider>
    );
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};
export default AppWrapper;
