import "./index.css";
import React, { Component } from "react";
import MenuIcon from "react-icons/lib/md/menu";
import { set, get, subscribe } from "./local-storage";

const withStorage = (key, default_) => Comp => {
  return class WithStorage extends Component {
    state = {
      [key]: get(key, default_)
    };

    componentDidMount() {
      this.unsubscribe = subscribe(() => {
        this.setState({
          [key]: get(key)
        });
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return <Comp {...this.props} {...this.state} setStorage={set} />;
    }
  };
};

class App extends React.Component {
  render() {
    const { sidebarIsOpen, setStorage } = this.props;
    return (
      <div className="app">
        <header>
          <button
            className="sidebar-toggle"
            title="Toggle menu"
            onClick={() => {
              setStorage("sidebarIsOpen", !sidebarIsOpen);
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

export default withStorage("sidebarIsOpen", true)(App);
