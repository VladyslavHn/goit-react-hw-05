import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Navigation from "./components/Navigation/Navigation";

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);
import NotFoundPage from "./pages/NotFoundPage";


function App() {

  return (
    <div>
      <Navigation/>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
          </Suspense>
      </main>
    </div>
  );
}

export default App;
