import { createElement } from "glamor/react"; // eslint-disable-line
/* @jsx createElement */
import Spinner from "react-svg-spinner";
import React from "react";
import { Router, Link } from "@reactions/router";
import {
  login,
  fetchWorkouts,
  fetchWorkout,
  fetchExercises,
  fetchNextWorkout
} from "./utils";
import withCache from "./withCache";
// import Img, { preload as preloadImg } from "./Img";

console.log(React.version);

// const LoadingBar = ({ animate }) => (
//   <div className={animate ? "loading-bar" : ""} />
// );

const link = {
  display: "inline-block",
  width: "200px",
  height: "200px",
  lineHeight: "200px",
  background: "#f0f0f0",
  textAlign: "center",
  margin: "20px",
  ":hover": {
    background: "#ddd"
  }
};

const Home = () => (
  <div>
    <h1 css={{ textAlign: "center" }}>Workout App!</h1>
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Link to="/workouts" css={link}>
        Workouts
      </Link>
      <Link to="/competitions" css={link}>
        Competitions
      </Link>
    </div>
  </div>
);

class Workouts extends React.Component {
  state = {
    workouts: null
  };

  async componentDidMount() {
    const workouts = await fetchWorkouts();
    this.setState({ workouts });
  }

  render() {
    const { workouts } = this.state;
    return workouts ? (
      <div>
        <Link to="..">Home</Link>
        <h1>Workouts</h1>
        {workouts.map(workout => (
          <Link key={workout.id} to={workout.id} css={link}>
            {workout.name}
          </Link>
        ))}
      </div>
    ) : (
      <LoadingSpinner />
    );
  }
}

class Workout extends React.Component {
  state = {
    workout: null,
    exercises: null,
    nextWorkout: null
  };

  async componentDidMount() {
    fetchWorkout(this.props.workoutId).then(workout => {
      this.setState({ workout });
    });
    fetchExercises(this.props.workoutId).then(exercises => {
      this.setState({ exercises });
    });
    fetchNextWorkout(this.props.workoutId).then(
      nextWorkout => {
        this.setState({ nextWorkout });
      }
    );
  }

  render() {
    const { workout, exercises, nextWorkout } = this.state;
    return (
      <div>
        <Link to="../..">Home</Link> /{" "}
        <Link to="..">Workouts</Link>
        {workout ? (
          <h1>{workout.name}</h1>
        ) : (
          <LoadingSpinner />
        )}
        {exercises ? (
          <ul>
            {exercises.map((exercise, i) => (
              <li key={i}>{exercise}</li>
            ))}
          </ul>
        ) : (
          <LoadingSpinner />
        )}
        {workout &&
          workout.completed &&
          (nextWorkout ? (
            <div>
              <h2>
                Up Next!{" "}
                <Link to={`../${nextWorkout.id}`}>
                  {nextWorkout.name}
                </Link>
              </h2>
            </div>
          ) : (
            <LoadingSpinner />
          ))}
      </div>
    );
  }
}

const Competitions = () => <div>Competitions</div>;

const LoadingSpinner = () => (
  <div css={{ textAlign: "center", padding: 20 }}>
    <Spinner size="100" />
  </div>
);

const App = withCache(({ cache }) => {
  login(cache);
  return (
    <Router>
      <Home path="/" />
      <Workouts path="workouts" />
      <Workout path="workouts/:workoutId" />
      <Competitions path="competitions" />
    </Router>
  );
});

export default App;
