import React from "react";
import Board from "./Board";

import "./style.css";

class Container extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
      size: "5",
    };
  }

  changeColor(params) {
    this.setState({
      color: params.target.value,
    });
  }

  changeSize(params) {
    this.setState({
      size: params.target.value,
    });
  }

  render() {
    let tools;
    if(this.state.color !== "rgba(131, 81, 81, 0)") {
      tools = (
        <div class="tools-section">
          <div className="color-picker-container">
            Select Brush Color : &nbsp;
            <input
              type="color"
              value={this.state.color}
              onChange={this.changeColor.bind(this)}
            />
          </div>
  
          <div className="brushsize-container">
            Select Brush Size : &nbsp;
            <select value={this.state.size} onChange={this.changeSize.bind(this)}>
              <option> 5 </option>
              <option> 10 </option>
              <option> 15 </option>
              <option> 20 </option>
              <option> 25 </option>
              <option> 30 </option>
            </select>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        {tools}
        <div class="board-container">
          <Board color={this.state.color} size={this.state.size}></Board>
        </div>
      </div>
    );
  }
}

export default Container;
