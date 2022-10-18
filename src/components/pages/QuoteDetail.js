import { Fragment, useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom"
import { useLoaderData } from "react-router-dom";
import { fetchSingleQuote } from "../hooks/use-http";
import HighlightedQuote from "../quotes/HighlightedQuote";

export default function QuoteDetail() {
    useEffect(() => {
        return setShowComments(false)
    }, []);

    const [showComment, setShowComments] = useState(false);

    const getLoader = useLoaderData();

    const clickHandler = () => setShowComments(true);

    return (
        <Fragment>
            <h1>QuoteDetail</h1>
            {getLoader ? <HighlightedQuote text={getLoader.text} author={getLoader.author} /> : <Navigate to="/no-quote-existed" replace={true} />}
            {!showComment
                ? <Link onClick={clickHandler} className="btn--flat centered" to="comments"> Render comments </Link>
                : <Outlet />}

        </Fragment>

    )
};

export function loader(obj) {
    return fetchSingleQuote(obj.params.quoteID);
};

