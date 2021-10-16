import PropTypes from "prop-types";
import React, { Component } from "react";

const scrollStyle = (width, height = "3", bgcolor = "#F43059", duration = "1", top = "0", zIndex = "99") => ({
  margin: 0,
  padding: 0,
  position: "fixed",
  top: `${top}px`,
  zIndex: `${zIndex}`,
  backgroundColor: `${bgcolor}`,
  height: `${height}px`,
  width: `${width}`,
  transitionProperty: "width",
  transitionDuration: `${duration}s`,
  transitionTimingFunction: `ease-out`,
});

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
    this.Scrolling = this.Scrolling.bind(this);
  }

  Scrolling() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (height > 0) {
      this.setState({ width: `${scrolled}%` });
    } else {
      this.setState({ width: null });
    }
  }

  componentDidMount() {
    try {
      window.addEventListener("scroll", this.Scrolling);
    } catch (oError) {
      console.log(oError);
    }
  }

  componentWillUnmount() {
    try {
      window.removeEventListener("scroll", this.Scrolling);
    } catch (oError) {
      console.log(oError);
    }
  }

  render() {
    const { width } = this.state;
    const { height, bgcolor, duration, top, zIndex } = this.props;
    return <div style={scrollStyle(width, height, bgcolor, duration, top, zIndex)} />;
  }
}

ProgressBar.propTypes = {
  height: PropTypes.number,
  duration: PropTypes.number,
  color: PropTypes.string.isRequired,
  top: PropTypes.number,
  zIndex: PropTypes.number
};

export default ProgressBar;
