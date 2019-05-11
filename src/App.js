import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Nominate } from "./pages/Nominate";

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/nominate/">Nominate</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/nominate/" component={Nominate} />
      </div>
    </Router>
  );
}

export default AppRouter;
