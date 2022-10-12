import { Fragment, useState } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import HighlightedQuote from "../quotes/HighlightedQuote";

export default function QuoteDetail() {
    const [showComments, setShowComment] = useState(false)
    const quotes = useSelector(state => state.quoteReducer)
    const inParams = useParams();
    const quote = quotes.quotesStore.find(el => el.id === inParams.quoteID);

    const clickHandler = () => setShowComment(prev => !prev)

    return (
        <Fragment>
            <h1>QuoteDetail</h1>
            {quote ? <HighlightedQuote text={quote.text} author={quote.author} /> : <Navigate to="/no-quote-existed" replace={true} />}
            {!showComments && <Link onClick={clickHandler} className="btn--flat centered" to="comments"> Render comments </Link>}
            {quote && showComments && <Outlet />}

        </Fragment>

    )
}

//add nofound with *