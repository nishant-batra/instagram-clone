import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
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
function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} exact />
            <Route path={ROUTES.SIGNUP} component={Signup} exact />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
