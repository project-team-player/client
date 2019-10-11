import React from 'react';
import pizzaWheelFormat from '../data/pizzaWheelFormat';
import '../styles/Slider.css';

class Slider extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      pizzaSrc: pizzaWheelFormat[0].src
    };
  }
  
  //**Used updatePizzaCounter instead of this because switched from slider to button increments */
  // onUpdateSlider(e) {
  //   this.setState({
  //     value: e.target.value,
  //     pizzaSrc: pizzaWheelFormat[e.target.value].src,
  //     altTag: pizzaWheelFormat[e.target.value].name
  //   });
  //   this.props.handleBetChanges(e);
  // }

  //**Used to update the pizza counter and render it */
  updatePizzaCounter(value) {
    this.setState({
      value: value,
      pizzaSrc: pizzaWheelFormat[value].src,
      altTag: pizzaWheelFormat[value].name
    });
    this.props.handleSliceChanges(value);
  }

  //**Decreases pizza counter by 1 */
  minusAction = () => {
    if (this.state.value === 0) {
      alert('Bet is already at 0!');
    } else {
      let tempValue = this.state.value;
      tempValue--;
      this.updatePizzaCounter(tempValue);
    }
  };

  //**Increases pizza counter by 1 */
  plusAction = () => {
    if (this.state.value === 8) {
      alert('Bet is already at 8!');
    } else {
      let tempValue = this.state.value;
      tempValue++;
      this.updatePizzaCounter(tempValue);
    }
  };

  render() {
    return (
      <div className='betContainer'>
        <div className='wheelContainer'>
          <img src={this.state.pizzaSrc} alt={this.state.name} />
        </div>
        <div className='buttonContainer'>
          <button className='betButton' onClick={this.minusAction}>
            -
          </button>
          <label className='betButton' id='betIndicator'>
            {this.state.value}
          </label>
          <button className='betButton' onClick={this.plusAction}>
            +
          </button>
        </div>
      </div>
    );
  }
}

export default Slider;
