/*
Create a `withStorage` higher order component that manages saving and retrieving
the `sidebarIsOpen` state to local storage
*/

import "./index.css";
import React from "react";
import MenuIcon from "react-icons/lib/md/menu";
import { set, get, subscribe } from "./local-storage";

class App extends React.Component {
  state = {
    sidebarIsOpen: get("sidebarIsOpen", true)
  };

  componentDidMount() {
    this.unsubscribe = subscribe(() => {
      this.setState({
        sidebarIsOpen: get("sidebarIsOpen")
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { sidebarIsOpen } = this.state;
    return (
      <div className="app">
        <header>
          <button
            className="sidebar-toggle"
            title="Toggle menu"
            onClick={() => {
              set("sidebarIsOpen", !sidebarIsOpen);
            }}
          >
            <MenuIcon />
          </button>
        </header>

        <div className="container">
          <aside className={sidebarIsOpen ? "open" : "closed"} />
          <main />
        </div>
      </div>
    );
  }
}

export default App;
