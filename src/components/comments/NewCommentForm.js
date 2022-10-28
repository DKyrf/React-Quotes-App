import React from 'react';
import { addComment } from '../hooks/use-http';
import { Form, redirect } from 'react-router-dom';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const textRef = React.useRef();

  return (
    <Form className={classes.form} method="post" action={`/quotes/${props.id}/comments`}>
      <div className={classes.control}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea ref={textRef} minLength="6" required id='comment' rows='5' name="comment"></textarea>
      </div>
      <div className={classes.actions}>
        <button onClick={props.cancelHandler} className={`${classes.cancel} + btn`}>Cancel</button>
        <button className='btn'>Add Comment </button>
      </div>

    </Form>
  );
};

export default React.memo(NewCommentForm);


export async function action(obj) {
  const formData = await obj.request.formData();
  const newComment = {
    id: obj.params.quoteID,
    value: formData.get("comment")
  };

  try {
    await addComment(newComment);
    document.getElementById("comment").value = "";
  } catch (error) {
    console.log(error);
  };

  return redirect(`/quotes/${obj.params.quoteID}/comments`)

}

