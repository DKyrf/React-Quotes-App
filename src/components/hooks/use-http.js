const firebaseDB = "https://router-quotes-acf44-default-rtdb.firebaseio.com";

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

    return quotes;

};

export async function fetchSingleQuote(id) {
    const fetchedQuote = await fetch(`${firebaseDB}/quotes/${id}.json`);

    if (fetchedQuote.ok) {
        return await fetchedQuote.json();
    } else throw new Error("Couldn't fetch quote." || fetchedQuote.statusText)

};

export async function addQuote(quoteData) {

    const postQuote = await fetch(`${firebaseDB}/quotes.json`, {
        method: "POST",
        body: JSON.stringify({ ...quoteData }),
        headers: {
            "Content-type": "application/json"
        },
    });
    const data = await postQuote.json();

    if (!postQuote.ok) {
        throw new Error("Could not feth quote." || postQuote.statusText)
    };

    return data

};

export async function addComment(requestData) {
    const postComment = await fetch(`${firebaseDB}/comments/${requestData.id}.json`, {
        method: "POST",
        body: JSON.stringify(requestData.value),
        headers: {
            "Content-Type": "application/json"
        },
    });

    const data = postComment.json();

    if (!postComment.ok) {
        throw new Error("Could not add comment." || postComment.statusText)
    };

    return { commentID: data.name };

};

export async function getAllComments(quoteID) {
    const getComments = await fetch(`${firebaseDB}/comments/${quoteID}.json`);
    const data = await getComments.json();

    if (!getComments.ok) {
        throw new Error("Could get comments." || getComments.statusText);
    };

    const comments = [];

    for (const key in data) {
        const comment = {
            id: key,
            value: data[key]
        };
        comments.push(comment);
    };

    return comments;

};

export async function AuthHandler(url, sendedData) {

    return fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email: sendedData.emailRef.current.value,
            password: sendedData.passwordRef.current.value,
            returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return res.json().then(data => {
                    let errorHandler = "Something went wrong...";
                    if (data && data.error && data.error.message) {
                        errorHandler = data.error.message;
                    };
                    return { status: "ERR", data: errorHandler };
                })
            }
        })
        .then(fetchedData => {
            return {
                status: fetchedData.status,
                token: fetchedData.idToken,
                message: fetchedData.data,
            };
        })
        .catch(error => {
            console.log(error)
        });


}