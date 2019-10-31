import React from 'react';
import pizzaWheelFormat from '../data/pizzaWheelFormat';
import '../styles/Slider.css';
import { UserContext } from '../contexts/UserContext';

class Slider extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      pizzaSrc: pizzaWheelFormat[0].src,
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
      if (this.state.value !== 0) {
        let tempValue = this.state.value;
        tempValue--;
        this.updatePizzaCounter(tempValue);
      }
    // }
  };

  //**Increases pizza counter by 1 */
  plusAction = () => {
      if (this.state.value !== 8) {
        let tempValue = this.state.value;
        tempValue++;
        this.updatePizzaCounter(tempValue);
      }
  };

  render() {
    const { context: { state: { isLoggedIn }, showModal } } = this.props;
    const { homeColor, awayColor } = this.state;
    return (
      <>
        <div className='wheelContainer'>
          <img src={this.state.pizzaSrc} alt={this.state.name} className="betWheel" />
        </div>
        <div className='button-container'>
          <div className="button-container-inner">
            <input type="button" className='betButton' onClick={ () => isLoggedIn ? this.minusAction() : showModal('Please login to make a bet') } value="-" />
            <span className='' id='betIndicator'>
              {this.state.value}
            </span>
            <input type="button" value="+" className='betButton' onClick={() => isLoggedIn ? this.plusAction() : showModal('Please login to make a bet') } />
          </div>
        </div>
      </>
    );
  }
}

export default props => (
  <UserContext.Consumer>
    {context => <Slider {...props} context={context} />}
  </UserContext.Consumer>
);
