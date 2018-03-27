import "./index.css";
import React from "react";
import createMediaListener from "./createMediaListener";
import { Galaxy, Trees, Earth } from "./screens";
import { CSSTransitionGroup } from "react-transition-group";

const withMedia = Comp => {
  const media = createMediaListener({
    big: "(min-width : 1000px)",
    tiny: "(max-width: 600px)"
  });

  return class WithMedia extends React.Component {
    state = {
      media: media.getState()
    };

    componentDidMount() {
      media.listen(media => this.setState({ media }));
    }

    componentWillUnmount() {
      media.dispose();
    }

    render() {
      return <Comp {...this.state} />;
    }
  };
};

class App extends React.Component {
  render() {
    const { media } = this.props;

    return (
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {media.big ? (
          <Galaxy key="galaxy" />
        ) : media.tiny ? (
          <Trees key="trees" />
        ) : (
          <Earth key="earth" />
        )}
      </CSSTransitionGroup>
    );
  }
}

const AppWithMedia = withMedia(App);

export default AppWithMedia;
