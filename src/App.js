import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useLoaderData } from "react-router-dom"
import Layout from "./components/layout/Layout";
import AllQuotes from "./components/pages/AllQuotes";
import NewQuotes from "./components/pages/NewQuotes";
import QuoteDetail from "./components/pages/QuoteDetail";
import HighlightedQuote from "./components/quotes/HighlightedQuote"
import Comments from "./components/comments/Comments";
import NotFound from "./components/pages/NotFound";
import { loader as tryLoad } from "./components/quotes/QuoteList"

function App() {


  const roures = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={tryLoad}>
      <Route path="/quotes/*" element={<AllQuotes />} loader={tryLoad} />
      <Route path="/new-quote" element={<NewQuotes />} loader={tryLoad} />
      <Route path="/quotes/:quoteID/*" element={<QuoteDetail />} loader={tryLoad}>
        <Route path="comments" element={<Comments />} loader={tryLoad} />
      </Route>
      <Route path="/highlighted" element={<HighlightedQuote />} loader={tryLoad} />
      <Route path="*" element={<NotFound />} loader={tryLoad} />

    </Route>
  ));

  return <RouterProvider router={roures} />

}

export default App;
