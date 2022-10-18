import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/Layout";
import AllQuotes from "./components/pages/AllQuotes";
import NewQuotes from "./components/pages/NewQuotes";
import QuoteDetail from "./components/pages/QuoteDetail";
import HighlightedQuote from "./components/quotes/HighlightedQuote"
import Comments from "./components/comments/Comments";
import NotFound from "./components/pages/NotFound";
import { loader as fetchLoader } from "./components/quotes/QuoteList"
import { loader as getLoader } from "./components/pages/QuoteDetail"
import { action as postAction } from "./components/pages/NewQuotes"

function App() {


  const roures = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route path="/quotes/*" element={<AllQuotes />} loader={fetchLoader} />
      <Route path="/new-quote" element={<NewQuotes />} action={postAction} />
      <Route path="/quotes/:quoteID/*" element={<QuoteDetail />} loader={getLoader}>
        <Route path="comments" element={<Comments />} />
      </Route>
      <Route path="/highlighted" element={<HighlightedQuote />} />
    </Route>
  ));

  return <RouterProvider router={roures} />

}

export default App;
