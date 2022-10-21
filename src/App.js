import React, { Suspense } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/Layout";
import HighlightedQuote from "./components/quotes/HighlightedQuote"
import Comments from "./components/comments/Comments";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { loader as quotesLoader } from "./components/quotes/QuoteList"
import { loader as singleQuoteLoader } from "./components/pages/QuoteDetail"
import { loader as commentsLoader } from "./components/comments/Comments";
import { action as quoteAction } from "./components/pages/NewQuotes"
import { action as commentAction } from "./components/comments/NewCommentForm";
function App() {

  const NewQuotes = React.lazy(() => import("./components/pages/NewQuotes"));
  const QuoteDetail = React.lazy(() => import("./components/pages/QuoteDetail"));
  const AllQuotes = React.lazy(() => import("./components/pages/AllQuotes"));
  const NotFound = React.lazy(() => import("./components/quotes/NoQuotesFound"));

  const roures = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route path="/quotes/*" element={<AllQuotes />} loader={quotesLoader} />
      <Route path="/new-quote" element={<NewQuotes />} action={quoteAction} />
      <Route path="/quotes/:quoteID/*" element={<QuoteDetail />} loader={singleQuoteLoader}>
        <Route path="comments" element={<Comments />} loader={commentsLoader} action={commentAction} />
      </Route>
      <Route path="/highlighted" element={<HighlightedQuote />} />
    </Route>
  ));

  return <Suspense fallback={<div className="centered"> <LoadingSpinner /> </div>}>
    <RouterProvider router={roures} />
  </Suspense>

}

export default App;
