import React from 'react';
import { addComment } from '../hooks/use-http';
import { Form, redirect } from 'react-router-dom';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {




  return (
    <Form className={classes.form} method="post" action={`/quotes/${props.id}/comments`}>
      <div className={classes.control}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea required id='comment' rows='5' name="comment"></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
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
  } catch (error) {
    console.log(error);
  };

  return redirect(`/quotes/${obj.params.quoteID}/comments`)

}

