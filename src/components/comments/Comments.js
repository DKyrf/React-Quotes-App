import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { getAllComments } from "../hooks/use-http"
import CommentItem from "./CommentItem"
import NewCommentForm from './NewCommentForm';
import classes from './Comments.module.css';

const Comments = () => {
  const commentsLoaderData = useLoaderData();

  const [isAddingComment, setIsAddingComment] = useState();
  const inParams = useParams();

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm id={inParams.quoteID} cancelHandler={() => setIsAddingComment(false)} />}
      <ul>
        {commentsLoaderData.map(el => <CommentItem key={el.id} text={el.value} />)}
      </ul>
    </section>
  );
};

export default Comments;

export function loader(obj) {
  return getAllComments(obj.params.quoteID)
}
