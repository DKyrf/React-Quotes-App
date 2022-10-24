import React, { Suspense } from "react";
import { Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/Layout";
import AllQuotes from "./components/pages/AllQuotes"
import HighlightedQuote from "./components/quotes/HighlightedQuote"
import Comments from "./components/comments/Comments";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { loader as quotesLoader } from "./components/quotes/QuoteList"
import { loader as singleQuoteLoader } from "./components/pages/QuoteDetail"
import { loader as commentsLoader } from "./components/comments/Comments";
import { action as quoteAction } from "./components/pages/NewQuotes"
import { action as commentAction } from "./components/comments/NewCommentForm";
// import AuthForm from "./authentication/AuthForm";
function App() {

  const NewQuotes = React.lazy(() => import("./components/pages/NewQuotes"));
  const QuoteDetail = React.lazy(() => import("./components/pages/QuoteDetail"));
  const AuthForm = React.lazy(() => import("./authentication/AuthForm"));
  const ProfilePage = React.lazy(() => import("./components/pages/ProfilePage"));
  const NotFound = React.lazy(() => import("./components/quotes/NoQuotesFound"));

  const roures = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route index element={<Navigate to="/quotes" />} />
      <Route path="/quotes/*" element={<AllQuotes />} loader={quotesLoader} />
      <Route path="/new-quote" element={<NewQuotes />} action={quoteAction} />
      <Route path="/quotes/:quoteID/*" element={<QuoteDetail />} loader={singleQuoteLoader}>
        <Route path="comments" element={<Comments />} loader={commentsLoader} action={commentAction} />
      </Route>
      <Route path="/highlighted" element={<HighlightedQuote />} />
      <Route path="/auth_form/*" element={<AuthForm />} />
      <Route path="/profile/:userID/*" element={<ProfilePage />} />
    </Route>
  ));

  return <Suspense fallback={<div className="centered"> <LoadingSpinner /> </div>}>
    <RouterProvider router={roures} />
  </Suspense>

}

export default App;
