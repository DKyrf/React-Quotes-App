import QuoteForm from "../quotes/QuoteForm"

export default function NewQuotes() {

    const addQuoteHandler = (data) => {
        console.log(data)
    }

    return (
        <QuoteForm onAddQuote={addQuoteHandler} />
    )
}