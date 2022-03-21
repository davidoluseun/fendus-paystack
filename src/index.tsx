import { ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
import RouteScrollToTop from "./components/common/RouteScrollToTop";
import App from "./App";
import { AppProvider } from "./components/common/AppContext";
import "./index.css";

const options = {
  position: positions.MIDDLE,
};

ReactDOM.render(
  <Router>
    <ColorModeScript />
    <AlertProvider template={AlertMUITemplate} {...options}>
      <RouteScrollToTop />
      <AppProvider>
        <App />
      </AppProvider>
    </AlertProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
