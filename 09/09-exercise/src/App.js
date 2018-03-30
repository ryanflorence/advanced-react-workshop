import { createElement } from "glamor/react"; // eslint-disable-line
/* @jsx createElement */
import Spinner from "react-svg-spinner";
import React from "react";
import { Router, Link } from "@reactions/router";
import {
  login,
  readWorkouts,
  readWorkout,
  readExercises,
  readNextWorkout
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

const Workouts = withCache(({ cache }) => {
  const workouts = readWorkouts(cache, 10);
  return (
    <div>
      <Link to="..">Home</Link>
      <h1>Workouts</h1>
      {workouts.map(workout => (
        <Link key={workout.id} to={workout.id} css={link}>
          {workout.name}
        </Link>
      ))}
    </div>
  );
});

const Workout = withCache(({ cache, workoutId }) => {
  readNextWorkout.preload(cache, workoutId);
  readWorkout.preload(cache, workoutId);
  readExercises.preload(cache, workoutId);
  const workout = readWorkout(cache, workoutId);
  const exercises = readExercises(cache, workoutId);
  return (
    <div>
      <Link to="../..">Home</Link> /{" "}
      <Link to="..">Workouts</Link>
      <h1>{workout.name}</h1>
      <ul>
        {exercises.map((exercise, i) => (
          <li key={i}>{exercise}</li>
        ))}
      </ul>
      {workout.completed && (
        <React.Timeout ms={500}>
          {didTimeout =>
            didTimeout ? (
              <LoadingSpinner />
            ) : (
              <NextWorkout workoutId={workoutId} />
            )
          }
        </React.Timeout>
      )}
    </div>
  );
});

const NextWorkout = withCache(({ cache, workoutId }) => {
  const nextWorkout = readNextWorkout(cache, workoutId);
  return (
    <div>
      <h2>
        Up Next!{" "}
        <Link to={`../${nextWorkout.id}`}>
          {nextWorkout.name}
        </Link>
      </h2>
    </div>
  );
});

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
