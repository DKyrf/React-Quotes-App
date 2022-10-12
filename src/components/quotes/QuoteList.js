import { Fragment } from 'react';
import { useSelector } from "react-redux"
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
  const navigate = useNavigate();
  const searchParams = useLocation();
  const quotes = useSelector(state => state.quoteReducer.quotesStore);
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
