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
    this.props.handleBetChanges(e);
  }

  render() {
    return (
      <div className="betContainer">
        <div className="wheelContainer">
          <img src={this.state.pizzaSrc} alt={this.state.name} />
        </div>
        <div className="buttonContainer">
          <button className='betButton'>-</button>
          <label className='betButton' id='betIndicator'>{this.state.value}</label>
          <button className='betButton'>+</button>
        </div>
        {/* <input
          className="c-input--range"
          list="tickmarks"
          max={8}
          onChange={e => this.onUpdateSlider(e)}
          step={1}
          type="range"
          name="pizza-slices"
          value={this.state.value}
        /> */}
      </div>
    );
  }
}

export default Slider;
