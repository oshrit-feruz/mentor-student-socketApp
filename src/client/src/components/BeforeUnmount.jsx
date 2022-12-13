import React, { Component } from "react";

export class BeforeUnmount extends Component {
  state = {};
  /**
   *
   * @param {{ beforeUnmount: () => any }} props
   */
  constructor(props) {
    super(props);
  }
  render() {
    return <></>;
  }
  componentWillUnmount() {
    this.props.beforeUnmount();
  }

  componentDidMount() {
    console.log("component mounted");
  }
}

export default BeforeUnmount;
