import React from "react";
import pizzaWheelFormat from "../data/pizzaWheelFormat";
import "../styles/Slider.css";

class Slider extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      pizzaSrc: pizzaWheelFormat[0].src
    };
  }

  onUpdateSlider(e) {
    this.setState({
      value: e.target.value,
      pizzaSrc: pizzaWheelFormat[e.target.value].src,
      altTag: pizzaWheelFormat[e.target.value].name
    });
  }

  render() {
    return (
      <div className="mb1">
        <div className="wheelContainer">
          <img src={this.state.pizzaSrc} alt={this.state.name} />
        </div>
        <label className="c-label">{this.state.value}</label>
        <input
          className="c-input--range"
          list="tickmarks"
          max={8}
          onChange={e => this.onUpdateSlider(e)}
          step={1}
          type="range"
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Slider;
