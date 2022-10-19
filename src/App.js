import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/Layout";
import AllQuotes from "./components/pages/AllQuotes";
import NewQuotes from "./components/pages/NewQuotes";
import QuoteDetail from "./components/pages/QuoteDetail";
import HighlightedQuote from "./components/quotes/HighlightedQuote"
import Comments from "./components/comments/Comments";
import NotFound from "./components/pages/NotFound";
import { loader as quotesLoader } from "./components/quotes/QuoteList"
import { loader as singleQuoteLoader } from "./components/pages/QuoteDetail"
import { loader as commentsLoader } from "./components/comments/Comments";
import { action as quoteAction } from "./components/pages/NewQuotes"
import { action as commentAction } from "./components/comments/NewCommentForm";

function App() {


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

  return <RouterProvider router={roures} />

}

export default App;
