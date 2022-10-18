import { redirect } from "react-router-dom"
import { addQuote } from "../hooks/use-http"
import QuoteForm from "../quotes/QuoteForm"

export default function NewQuotes() {

    return (
        <QuoteForm />
    )
}

export async function action(obj) {
    console.log(obj);
    const formData = await obj.request.formData();
    const newPost = {
        author: formData.get("author"),
        text: formData.get("text"),
    };
    try {
        await addQuote(newPost)
    } catch (error) {
        console.log(error);
        throw error

    };

    return redirect("/quotes");

}