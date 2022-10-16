import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllComments } from "../hooks/use-http"
import CommentItem from "./CommentItem"
import NewCommentForm from './NewCommentForm';
import classes from './Comments.module.css';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState();
  const [comments, setComments] = useState([])
  const inParams = useParams();

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const getComments = useCallback(async () => {
    const data = await getAllComments(inParams.quoteID);
    console.log(data);
    setComments(data);
  }, [inParams.quoteID]);

  useEffect(() => {
    getComments()
  }, [getComments])

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm id={inParams.quoteID} />}
      <ul>
        {comments.map(el => <CommentItem key={el.id} text={el.value} />)}
      </ul>
    </section>
  );
};

export default Comments;
