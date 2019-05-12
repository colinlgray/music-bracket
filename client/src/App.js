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
              <Link to="/otherpage/">Other Page</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/otherpage/" component={Nominate} />
      </div>
    </Router>
  );
}

export default AppRouter;
