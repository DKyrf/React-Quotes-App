import { useLoaderData } from "react-router-dom"
import QuoteList from "../quotes/QuoteList"


export default function AllQuotes() {

    const doNotUnderstand = useLoaderData();

    return <QuoteList quotes={doNotUnderstand} />
}