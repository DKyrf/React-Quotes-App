import { useRef, useCallback } from 'react';
import { addComment } from '../hooks/use-http';
import { useDispatch } from "react-redux"
import { newQuoteAction } from "../store/newQuoteSlice";
import { useNavigate } from 'react-router-dom';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const navigate = useNavigate();
  const dispatchFN = useDispatch();
  const commentTextRef = useRef();

  const sendComment = useCallback(async (commentData) => {
    await addComment(commentData);

  }, []);

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendComment({ id: props.id, value: commentTextRef.current.value });
    commentTextRef.current.value = "";
    dispatchFN(newQuoteAction.setCommentsVisibility(false))
    navigate(`/quotes/${props.id}`, { replace: true })
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea required id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
