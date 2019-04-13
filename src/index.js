import PropTypes from "prop-types";
import React, { Component } from "react";

const scrollStyle = (width, height = "3", bgcolor = "#F43059", duration = "1") => ({
  margin: 0,
  padding: 0,
  position: "fixed",
  top: 0,
  zIndex: "99",
  backgroundColor: `${bgcolor}`,
  height: `${height}px`,
  width: `${width}`,
  transition: `${width} ${duration}s ease`,
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
    const { height, bgcolor, duration } = this.props;
    return <div style={scrollStyle(width, height, bgcolor, duration)} />;
  }
}

ProgressBar.propTypes = {
  height: PropTypes.number,
  duration: PropTypes.number,
  color: PropTypes.string.isRequired
};

export default ProgressBar;
