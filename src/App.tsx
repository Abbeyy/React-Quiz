import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./components/home/home";
import { NavigationDrawer } from "./components/navigation/drawer/navigation-drawer";
import Quiz from "./components/quiz/quiz";

import { ThemeProvider } from "@material-ui/core/styles";

import { createTheme } from "@material-ui/core/styles";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Abbey's Mish-mash Project</h1>

        <Router>
          <div>
            <NavigationDrawer />

            <Switch>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
