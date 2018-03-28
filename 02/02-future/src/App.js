import "./index.css";
import React, { Component } from "react";
import { unstable_createReturn, unstable_createCall } from "react-call-return";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

class RadioGroup extends Component {
  state = {
    value: this.props.defaultValue
  };

  render() {
    const { children } = this.props;
    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {unstable_createCall(children, (props, returns) =>
          returns.map(item =>
            item.render({
              isActive: item.value === this.state.value,
              onSelect: () => this.setState({ value: item.value })
            })
          )
        )}
      </fieldset>
    );
  }
}

class RadioButton extends Component {
  render() {
    return unstable_createReturn({
      value: this.props.value,
      render: ({ isActive, onSelect }) => {
        const className = "radio-button " + (isActive ? "active" : "");
        return (
          <button className={className} onClick={onSelect}>
            {this.props.children}
          </button>
        );
      }
    });
  }
}

const BackwardButton = () => (
  <RadioButton value="back">
    <FaBackward />
  </RadioButton>
);

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup defaultValue="pause" legend="Radio Group">
          <BackwardButton />
          <RadioButton value="play">
            <FaPlay />
          </RadioButton>
          <RadioButton value="pause">
            <FaPause />
          </RadioButton>
          <RadioButton value="forward">
            <FaForward />
          </RadioButton>
        </RadioGroup>
      </div>
    );
  }
}

export default App;
