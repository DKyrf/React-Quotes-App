import useValidator from "../hooks/useValidator";
import { useSelector, useDispatch } from "react-redux";
import { newQuoteAction } from "../store/newQuoteSlice";
import { addQuote } from "../hooks/use-http";
import { useCallback } from "react";
import LoadingSpinner from "../UI/LoadingSpinner"
import Card from '../UI/Card';
import classes from './QuoteForm.module.css';

let init = true;

const QuoteForm = (props) => {
  const { authChangeHandler, textChangeHandler, authorBlur, textBlur, authValid, textValid, } = useValidator();

  init = false;

  const newEntry = useSelector(state => state.newQuoteReducer);
  const dispatchFN = useDispatch();

  const fetchQuotes = useCallback(async () => {
    const quotes = await addQuote({
      author: newEntry.author,
      text: newEntry.text
    });

    return quotes;
  }, [newEntry]);

  function submitFormHandler(event) {
    event.preventDefault();
    fetchQuotes();
    dispatchFN(newQuoteAction.reset());
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
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
            value={newEntry.author}
            type='text'
            id='author' />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea
            style={{ backgroundColor: textValid && !init ? "pink" : "white" }}
            onBlur={textBlur}
            onChange={textChangeHandler}
            value={newEntry.text}
            id='text'
            rows='5' ></textarea>
        </div>
        <div className={classes.actions}>
          <button
            type='submit'
            className='btn'
            disabled={!newEntry.isValid}>Add Quote</button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;



