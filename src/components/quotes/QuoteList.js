import { Fragment, useEffect } from 'react';
import { httpAction } from '../store/httpSlice';
import { useSelector, useDispatch } from "react-redux";
import { FetchQuotes } from '../hooks/use-http';
import { useLocation, useNavigate } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sorteQuotes = (prevQuotes, ascChecker) => [...prevQuotes].sort((a, b) => {
  if (ascChecker) {
    return a.id > b.id ? 1 : -1
  } else {
    return a.id < b.id ? 1 : -1
  }
});

const QuoteList = () => {

  const dispatchFN = useDispatch();
  const { quotes, status, error } = useSelector(state => state.httpReducer)


  useEffect(() => {
    const getData = async () => {
      dispatchFN(httpAction.quotesSending());
      const { quotes, error } = await FetchQuotes();
      console.log(error, quotes)
      if (!error) {
        dispatchFN(httpAction.requestSucessfull(quotes));
      }
    };

    getData();

  }, [dispatchFN]);

  console.log(quotes, status, error)


  const navigate = useNavigate();
  const searchParams = useLocation();
  const searched = new URLSearchParams(searchParams.search);
  const isAscending = searched.get("sort") === "asc";
  const sorted = sorteQuotes(quotes, isAscending);



  const navigateHandler = () => {
    navigate(`/quotes?sort=${isAscending ? "des" : "asc"}`);
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={navigateHandler}>Sorted {isAscending ? "Ascending" : "Decending"}</button>
      </div>
      <ul className={classes.list}>
        {sorted.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
