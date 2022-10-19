import { useLoaderData } from "react-router-dom"
import QuoteList from "../quotes/QuoteList"


export default function AllQuotes() {

    const quotesLoader = useLoaderData();

    return <QuoteList quotes={quotesLoader} />
}