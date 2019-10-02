import React from 'react';
import Slider from './Slider';
import TeamChoice from './TeamChoice';
import '../styles/BetForm.css';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  makeGameBet() {
    console.log('Comments Initiated');
  }

  render() {
    const { } = this.props;
    return (
      <div className='betForm'>
        
        <form onSubmit={this.makeGameBet}>
                <textarea
                  type='text'
                  name='comment'
                  className='input-comment-field'
                  
                />
                <button className='button'>Comment</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
