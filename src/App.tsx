import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./routes";

export const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
