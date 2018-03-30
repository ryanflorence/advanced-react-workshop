import { createResource } from "simple-cache-provider";

const sleep = (ms = 1000) =>
  new Promise(res => setTimeout(res, ms));

let token = null;

export const login = createResource(
  () =>
    new Promise(async (res, rej) => {
      token = localStorage.getItem("token");
      if (token) {
        res(token);
      } else {
        token = prompt("Give me a token, anything will do!");
        if (token.trim() === "")
          token = Math.random()
            .toString(32)
            .substr(2, 8);
        localStorage.setItem("token", token);
        // fake some async waiting
        await sleep();
        res(token);
      }
    })
);

const fakeWorkouts = [
  {
    name: "Chest and Back",
    id: "chest-back",
    completed: true
  },
  { name: "Cardio", id: "cardio", completed: false },
  { name: "Lower Body", id: "lower", completed: false },
  { name: "Core", id: "core", completed: false },
  { name: "Upper Body", id: "upper", completed: false }
];

const fakeExercises = {
  "chest-back": [
    "pull-ups",
    "push-ups",
    "chin-ups",
    "military pushups",
    "close-grip pullups",
    "wide pushups"
  ],
  cardio: [
    "run in place",
    "hop squats",
    "figure eights",
    "jab punch sprawl",
    "burpees"
  ],
  lower: [
    "lunges",
    "jump squats",
    "side-kicks",
    "hip raises"
  ],
  core: ["crunches"],
  "upper-body": ["curls"]
};

const fakeNextWorkouts = {
  "chest-back": "cardio",
  cardio: "lower",
  lower: "core",
  core: "upper-body",
  "upper-body": "chest-back"
};

////////////////////////////////////////////////////////////
// fetchers
export const fetchWorkouts = () =>
  new Promise(async res => {
    console.logTakeoff("readWorkouts");
    await sleep(1000);
    console.logLanding("readWorkouts");
    res(fakeWorkouts);
  });

export const fetchWorkout = id =>
  new Promise(async res => {
    console.logTakeoff(`readWorkouts ${id}`);
    await sleep(2000);
    console.logLanding(`readWorkouts ${id}`);
    res(fakeWorkouts.find(w => w.id === id));
  });

export const fetchExercises = id =>
  new Promise(async res => {
    console.logTakeoff(`readExercises ${id}`);
    await sleep(1000);
    console.logLanding(`readExercises ${id}`);
    res(fakeExercises[id]);
  });

export const fetchNextWorkout = id =>
  new Promise(async res => {
    console.logTakeoff(`readRelated ${id}`);
    await sleep(500);
    console.logLanding(`readRelated ${id}`);
    res(
      fakeWorkouts.find(
        workout => workout.id === fakeNextWorkouts[id]
      )
    );
  });

////////////////////////////////////////////////////////////
// readers
export const readWorkouts = createResource(
  () =>
    new Promise(async res => {
      console.logTakeoff("readWorkouts");
      await sleep(1000);
      console.logLanding("readWorkouts");
      res(fakeWorkouts);
    })
);

export const readWorkout = createResource(
  id =>
    new Promise(async res => {
      console.logTakeoff(`readWorkouts ${id}`);
      await sleep(1000);
      console.logLanding(`readWorkouts ${id}`);
      res(fakeWorkouts.find(w => w.id === id));
    })
);

export const readExercises = createResource(
  id =>
    new Promise(async res => {
      console.logTakeoff(`readExercises ${id}`);
      await sleep(1000);
      console.logLanding(`readExercises ${id}`);
      res(fakeExercises[id]);
    })
);

export const readNextWorkout = createResource(
  id =>
    new Promise(async res => {
      console.logTakeoff(`readRelated ${id}`);
      await sleep(3000);
      console.logLanding(`readRelated ${id}`);
      res(
        fakeWorkouts.find(
          workout => workout.id === fakeNextWorkouts[id]
        )
      );
    })
);

////////////////////////////////////////////////////////
// Contacts
const API = `https://contacts.now.sh`;
const fetchContacts = async (url, opts = { headers: {} }) => {
  return fetch(`${API}${url}`, {
    ...opts,
    headers: { authorization: token, ...opts.headers }
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return res;
    }
  });
};

export const readContacts = createResource(() =>
  fetchContacts("/contacts")
);

export const readContact = createResource(id =>
  fetchContacts(`/contacts/${id}`)
);

export const createContact = contact =>
  fetchContacts("/contacts", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ contact })
  });

////////////////////////////////////////////////////////
// logging stuff
console.logTakeoff = str => {
  console.log(
    `%c🛫 ${str}`,
    "font-size: 20px; color: hsl(10, 50%, 50%)"
  );
};

console.logLanding = str => {
  console.log(
    `%c🛬 ${str}`,
    "font-size: 20px; color: hsl(170, 50%, 50%)"
  );
};
