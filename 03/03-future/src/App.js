import "./index.css";
import React, { Component, PureComponent, createContext } from "react";
import FaAutomobile from "react-icons/lib/fa/automobile";
import FaBed from "react-icons/lib/fa/bed";
import FaPlane from "react-icons/lib/fa/plane";
import FaSpaceShuttle from "react-icons/lib/fa/space-shuttle";
import * as text from "./text";

const TabContext = createContext();

class Tabs extends Component {
  state = {
    activeIndex: 0
  };

  getContext() {
    return {
      activeIndex: this.state.activeIndex,
      onSelectTab: this.selectTabIndex
    };
  }

  selectTabIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  render() {
    return (
      <TabContext.Provider value={this.getContext()}>
        <div className="Tabs">{this.props.children}</div>;
      </TabContext.Provider>
    );
  }
}

class TabList extends Component {
  render() {
    return (
      <TabContext.Consumer>
        {context => {
          const { activeIndex } = context;
          const children = React.Children.map(
            this.props.children,
            (child, index) => {
              return React.cloneElement(child, {
                isActive: index === activeIndex,
                onSelect: () => context.onSelectTab(index)
              });
            }
          );
          return <div className="tabs">{children}</div>;
        }}
      </TabContext.Consumer>
    );
  }
}

class Tab extends Component {
  render() {
    const { isActive, isDisabled, onSelect } = this.props;
    return (
      <div
        className={
          isDisabled ? "tab disabled" : isActive ? "tab active" : "tab"
        }
        onClick={isDisabled ? null : onSelect}
      >
        {this.props.children}
      </div>
    );
  }
}

class TabPanels extends Component {
  render() {
    return (
      <TabContext.Consumer>
        {context => {
          const { children } = this.props;
          const { activeIndex } = context;
          return <div className="panels">{children[activeIndex]}</div>;
        }}
      </TabContext.Consumer>
    );
  }
}

class TabPanel extends Component {
  render() {
    return this.props.children;
  }
}

class Blocker extends PureComponent {
  render() {
    return this.props.children;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tabs>
          <Blocker>
            <TabList>
              <Tab>
                <FaAutomobile />
              </Tab>
              <Tab>
                <FaBed />
              </Tab>
              <Tab>
                <FaPlane />
              </Tab>
              <Tab>
                <FaSpaceShuttle />
              </Tab>
            </TabList>
          </Blocker>
          <div>
            <TabPanels>
              <TabPanel>{text.cars}</TabPanel>
              <TabPanel>{text.hotels}</TabPanel>
              <TabPanel>{text.flights}</TabPanel>
              <TabPanel>{text.space}</TabPanel>
            </TabPanels>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;
