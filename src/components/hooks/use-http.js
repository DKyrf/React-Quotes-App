import { httpAction } from "../store/httpSlice";

const firebaseDB = "ttps://router-quotes-acf44-default-rtdb.firebaseio.com";

export async function FetchQuotes() {


    const fethedData = await fetch(`${firebaseDB}/quotes.json`);
    const data = await fethedData.json();

    if (!fethedData.ok) {
        return { quotes: [], error: fethedData.statusText }
    };

    const quotes = [];

    for (const key in data) {
        const quote = {
            id: key,
            ...data[key],
        };
        quotes.push(quote);
    };

    return { quotes: quotes, error: null };

};

export async function fetchSingleQuote(id) {
    const fetchedQuote = fetch(`${firebaseDB}/quotes/${id}.json`);
    const quote = await fetchedQuote.json();

    if (!fetchedQuote.ok) {
        httpAction.requestError(fetchedQuote.statusText || "Could not feth quote.")
    }

    return quote
};

export async function addQuote(quoteData) {

    console.log(quoteData);

    const postQuote = await fetch(`${firebaseDB}/quotes.json`, {
        method: "POST",
        body: JSON.stringify({ ...quoteData }),
        headers: {
            "Content-type": "application/json"
        },
    });
    const data = await postQuote.json();

    if (!postQuote.ok) {
        httpAction.requestError(postQuote.statusText || "Could not feth quote.")
    };

    return data

};

export async function addComment(requestData) {
    const postComment = await fetch(`${firebaseDB}/comments/${requestData.id}.json`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
            "Content-Type": "application/json"
        },
    });

    const data = postComment.json();

    if (!postComment.ok) {
        httpAction.requestError(postComment.statusText || "Could not add comment.")
    };

    return { commentID: data.name };

};

export async function getAllComments(quoteID) {
    const getComments = fetch(`${firebaseDB}/comments/${quoteID}.json`);
    const data = await getComments.json();

    if (!getComments.ok) {
        httpAction.requestError(getComments.statusText || "Could get comments.")
    };

    const comments = [];

    for (const key in data) {
        const comment = {
            id: key,
            ...data[key]
        };
        comments.push(comment);
    };

    httpAction.commentsSending(comments);

};