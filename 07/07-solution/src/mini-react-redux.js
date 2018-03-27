import React from "react";
import PropTypes from "prop-types";

class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }
}

const connect = (mapStateToProps, mapDispatchToProps) => {
  return Component => {
    return class extends React.Component {
      static contextTypes = {
        store: PropTypes.object.isRequired
      };

      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return (
          <Component
            {...mapStateToProps(this.context.store.getState())}
            {...mapDispatchToProps(this.context.store.dispatch)}
          />
        );
      }
    };
  };
};

export { Provider, connect };
