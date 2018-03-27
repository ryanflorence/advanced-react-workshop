import "./index.css";
import React from "react";

const getHeaderStyle = y => {
  const pin = y >= 300;
  const top = -y / 2;
  return {
    top: pin ? "0px" : `${top + 150}px`,
    textShadow: pin
      ? `0px ${(y - 300) / 5}px ${Math.min(
          (y - 300) / 10,
          50
        )}px rgba(0, 0, 0, 0.5)`
      : "none"
  };
};

class App extends React.Component {
  state = { y: 0 };

  handleWindowScroll = () => {
    this.setState({ y: window.scrollY });
  };

  componentDidMount() {
    this.handleWindowScroll();
    window.addEventListener("scroll", this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleWindowScroll);
  }

  render() {
    const { y } = this.state;
    return (
      <div className="app">
        <h1 style={getHeaderStyle(y)}>Scroll down!</h1>
      </div>
    );
  }
}

export default App;
