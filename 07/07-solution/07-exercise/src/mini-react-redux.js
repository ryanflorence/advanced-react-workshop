import React from "react";
import PropTypes from "prop-types";

/*
// Tips:

// Get the store's state
store.getState()

// Dispatch changes to the store
// (you won't need to call this but you'll pass it to mapDispatchToProps)
store.dispatch(action)

// subscribe to changes to the store
store.subscribe(() => {})

// unsubscribe from the store
unsubscribe = store.subscribe(() => {})
unsubscribe()
*/

class Provider extends React.Component {
  render() {
    return null;
  }
}

const connect = (mapStateToProps, mapDispatchToProps) => {
  return Component => {
    return Component;
  };
};

export { Provider, connect };
