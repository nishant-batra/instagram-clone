import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
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
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} exact />
          <Route path={ROUTES.SIGNUP} component={Signup} exact />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
