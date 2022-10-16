import { Fragment, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { newQuoteAction } from "../store/newQuoteSlice";
import { Link, Navigate, Outlet, useParams } from "react-router-dom"

import { fetchSingleQuote } from "../hooks/use-http";
import HighlightedQuote from "../quotes/HighlightedQuote";

export default function QuoteDetail() {
    const dispatchFN = useDispatch();
    const showComment = useSelector(state => state.newQuoteReducer.showComments)
    const [quote, setQuote] = useState([]);
    const inParams = useParams();

    const quoteFinder = useCallback(async () => {
        const fetchedQuote = await fetchSingleQuote(inParams.quoteID);
        setQuote(fetchedQuote);
    }, [inParams.quoteID]);

    useEffect(() => {
        quoteFinder();
    }, [quoteFinder])

    const clickHandler = () => dispatchFN(newQuoteAction.setCommentsVisibility(true))

    return (
        <Fragment>
            <h1>QuoteDetail</h1>
            {quote ? <HighlightedQuote text={quote.text} author={quote.author} /> : <Navigate to="/no-quote-existed" replace={true} />}
            {!showComment && <Link onClick={clickHandler} className="btn--flat centered" to="comments"> Render comments </Link>}
            {quote && showComment && <Outlet />}

        </Fragment>

    )
}

