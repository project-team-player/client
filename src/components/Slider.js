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

  minusAction = () => {
    if(this.state.value === 0) {
      alert('Bet is already at 0!');
    }
    else {
      let tempValue = this.state.value;
      tempValue--;
      this.setState({ value: tempValue });
    }
  }

  plusAction = () => {
    if(this.state.value === 8) {
      alert('Bet is already at 8!');
    }
    else {
      let tempValue = this.state.value;
      tempValue++;
      this.setState({ value: tempValue });
    }
  }

  render() {
    return (
      <div className="betContainer">
        <div className="wheelContainer">
          <img src={this.state.pizzaSrc} alt={this.state.name} />
        </div>
        <div className="buttonContainer">
          <button className='betButton'onClick={this.minusAction}>-</button>
          <label className='betButton' id='betIndicator'>{this.state.value}</label>
          <button className='betButton' onClick={this.plusAction}>+</button>
        </div>
      </div>
    );
  }
}

export default Slider;
