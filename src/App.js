import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";

import useAuthListener from "./hooks/use-auth-listener";
import ProtectedRoutes from "./helpers/protected.routes";
import "./styles/app.css";

const Login = lazy(() => {
  return import("./pages/Login");
});
const Signup = lazy(() => {
  return import("./pages/Signup");
});
const NotFound = lazy(() => {
  return import("./pages/NotFound");
});
const Dashboard = lazy(() => {
  return import("./pages/Dashboard");
});
const Profile = lazy(() => {
  return import("./pages/profile");
});
function App() {
  const { user } = useAuthListener();
 
  return (

      <UserContext.Provider value={{ user }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>
              <Route component={Login} path={ROUTES.LOGIN} />
              <Route component={Signup} path={ROUTES.SIGNUP} />

              <ProtectedRoutes user={user} path={ROUTES.DASHBOARD} exact>
                <Dashboard />
              </ProtectedRoutes>
              <Route component={Profile} path={ROUTES.PROFILE} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </Suspense>
      </UserContext.Provider>

  );
}

export default App;
