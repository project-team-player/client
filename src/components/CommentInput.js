import React, { useState, useRef, useEffect } from 'react';
import UserAvatar from '../images/user-avatar.svg';
import { UserContext } from '../contexts/UserContext';
import '../styles/CommentInput.css'
import axios from 'axios';
import { getUserToken } from '../utils/auth';
import { ValidationError } from '../utils/error-handler';


const CommentInput = ({context, gamethreadSlug, gamethreadId, fetchNewComments}) => {
  console.log(gamethreadSlug, gamethreadId);
  const commentFormContainer = useRef();
  const commentInputField = useRef();
  const [showTextInput, setShowTextInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    // Focuses text on textArea when toggled
    if (showTextInput === true) {
      commentInputField.current.focus();
    }
  }, [showTextInput])

  const openTextArea = () => {
    if (context.state.isLoggedIn) {
      setShowTextInput(true);
      document.addEventListener('mousedown', handleClick);
    } else {
      context.showModal('Please log in to comment');
    }
  }

  const closeTextArea = () => {
    setShowTextInput(false)
  }

  const scrollToBottom = () => {
    window.scrollTop = window.scrollHeight;
  }

  const submitComment = async (e) => {
    try {
      // Don't allow empty comments
      if (commentText.length < 1) throw new ValidationError("Comment can't be empty");
      const { username } = context.state.user;
  
      // Submit comment to server/db
      await axios({ method: 'POST', url: `${process.env.REACT_APP_SERVER_URL}/comments/gamethread/${gamethreadSlug}`, headers: { authorization: `Bearer ${getUserToken()}`}, data: {username, text: commentText, gamethreadId }})

      fetchNewComments();
      setCommentText('');
      setShowTextInput(false);
      // document.removeEventListener('mousedown', handleClick);
    } catch (error) {
      if (error instanceof ValidationError) {
        setValidationError(error.message)
      }
      setValidationError('Oops, something went wrong. Please try again later or contact support at teamplayer4321234@gmail.com for assistance.')
    }
  }

  const handleClick = (e) => {
    if (commentFormContainer.current.contains(e.target)) {
      return;
    }
    handleClickOutside();
  }

  const handleClickOutside = () => {
    setShowTextInput(false);
    document.removeEventListener('mousedown', handleClick);
  }

  return (
      <div className="comment-input-container card" onClick={openTextArea} ref={commentFormContainer}>
        <div className="comment-input-header">
          <img className="comment-user-avatar" src={UserAvatar} alt="profilepic" />
          {showTextInput ? context.state.user.username :  <span className="comment-input-headline">Write some spicy trash talk...</span>}
        </div>
        {
          showTextInput &&
          <>
            <form className="comment-input-footer" onSubmit={(e) => { 
              e.preventDefault();
              submitComment();
              }
            }>
              <textarea rows="6" cols="20" id="reply-input-text" className="comment-input-text" type="text" name="reply-text" value={commentText} onChange={(e) => setCommentText(e.target.value)} ref={commentInputField} />
              <input type="submit" value="Comment" className="comment-input-submit-btn" />
            </form>
            { validationError.length > 1 &&
              <p className="formValidationErrors">{validationError}</p>
            }
          </>
        }

      </div> 
  )
}

export default props => (
  <UserContext.Consumer>
    {context => <CommentInput {...props} context={context} />}
  </UserContext.Consumer>
);