import useValidator from "../hooks/useValidator";
import { useSelector } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner"
import Card from '../UI/Card';
import classes from './QuoteForm.module.css';
import { Form, useActionData } from "react-router-dom";

let init = true;

const QuoteForm = (props) => {
  const { authChangeHandler, textChangeHandler, authorBlur, textBlur, authValid, textValid, } = useValidator();
  const data = useActionData();
  console.log(data);

  init = false;

  const newEntry = useSelector(state => state.newQuoteReducer);

  return (
    <Card>
      <Form className={classes.form} method="post" action="/new-quote">
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor='author'>Author { }</label>
          <input
            style={{ backgroundColor: authValid && !init ? "pink" : "white" }}
            onBlur={authorBlur}
            onChange={authChangeHandler}
            type='text'
            name="author"
            id='author' />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea
            style={{ backgroundColor: textValid && !init ? "pink" : "white" }}
            onBlur={textBlur}
            onChange={textChangeHandler}
            name="text"
            id='text'
            rows='5' ></textarea>
        </div>
        <div className={classes.actions}>
          <button
            type='submit'
            className='btn'
            disabled={!newEntry.isValid}>Add Quote</button>
        </div>
      </Form>
    </Card>
  );
};

export default QuoteForm;



