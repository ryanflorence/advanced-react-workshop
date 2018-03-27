////////////////////////////////////////////////////////////////////////////////
import React from "react";
import { createBrowserHistory } from "history";
import * as PropTypes from "prop-types";

/*
// create a new history instance
history = createBrowserHistory()

// read the current URL
history.location

// listen for changes to the URL
const unsubscribe = history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

class Router extends React.Component {
  render() {
    return this.props.children;
  }
}

class Route extends React.Component {
  render() {
    return null;
  }
}

class Link extends React.Component {
  handleClick = e => {
    e.preventDefault();
  };

  render() {
    return (
      <a href={`${this.props.to}`} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export { Router, Route, Link };
