import "./index.css";
import React from "react";
import { Router, Route, Link } from "./mini-router";

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route
        exact
        path="/"
        render={() => (
          <div>
            <h2>Home</h2>
          </div>
        )}
      />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>Rendering with React</li>
      <li>Components</li>
      <li>Props v. State</li>
    </ul>
  </div>
);

export default App;
