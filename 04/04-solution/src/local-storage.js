let subscribers = [];

export const set = (key, value) => {
  localStorage.setItem(key, value);
  subscribers.forEach(s => s());
};

export const subscribe = fn => {
  subscribers.push(fn);
  const unsubscribe = () => {
    subscribers.filter(s => s !== fn);
  };
  return unsubscribe;
};

export const get = (key, default_) =>
  JSON.parse(localStorage.getItem(key) || JSON.stringify(default_));
