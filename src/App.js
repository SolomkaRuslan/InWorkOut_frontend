import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

import ExercisesPage from "./pages/ExercisesPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import StatsPage from "./pages/StatsPage";
import MainNavbar from "./components/MainNavbar/MainNavbar";

import NotificationProvider from "./helpers/notifications/NotificationProvider";

function App() {
  console.log("App rendered");

  const client = useApolloClient();
  const [userToken, setUserToken] = useState(sessionStorage.getItem("token"));

  const login = (token, name) => {
    console.log(name);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("name", name);
    setUserToken(token);
  };

  const logout = () => {
    client.clearStore();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    setUserToken(null);
  };

  return (
    <NotificationProvider>
      <BrowserRouter>
        <>
          <MainNavbar logedIn={!!userToken} logout={logout} />
          <main>
            {userToken ? (
              <Switch>
                <Route path="/profile" component={ExercisesPage} />
                <Route path="/workouts" component={WorkoutsPage} />
                <Route path="/statistics" component={StatsPage} />
                <Redirect from="/auth" to="/profile" />
                <Route path="/" component={LandingPage} exact />
              </Switch>
            ) : (
              <Switch>
                <Redirect from="/profile" to="/auth" />
                <Redirect from="/workouts" to="/auth" />
                <Redirect from="/statistics" to="/auth" />
                <Route
                  path="/auth"
                  render={(props) => <AuthPage {...props} login={login} />}
                />
                <Route path="/" component={LandingPage} exact />
              </Switch>
            )}
          </main>
        </>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
