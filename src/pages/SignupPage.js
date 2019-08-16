import React from 'react';
// import PropTypes from 'prop-types';
import FootballVideo from '../media/FootballVideo.mp4';
import SignupForm from '../components/SignupForm';

// Insert components here

import '../styles/SignupPage.css';

class SignupPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <h3 className='hookSentence'>
          Join 1299 other football fans here at Slice It and become the next NFL
          expert!
        </h3>
        <div className='wrapper'>
          <aside className='SignUpVideo'>
            <video width='50vw' height='200vh' controls>
              <source src={FootballVideo} type='video/mp4' />
              <source src='../media/FootballVideo.ogg' type='video/ogg' />
            </video>
          </aside>
          <div className='SignUp'>
            <SignupForm />
          </div>
        </div>
      </div>
    );
  }
}

export default SignupPage;
