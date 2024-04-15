// MovieDetailsPage.jsx
import { Suspense, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { requestMovieDetails } from "../components/services/services";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { Link, Outlet, useLocation, useParams } from "react-router-dom"; 
import css from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const { movieId } = useParams(); 
  const location = useLocation();
  const backLink = useRef(location.state ?? "/");

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      try {
        const data = await requestMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
        toast.error("Failed to fetch movie details.");
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [movieId]); 

  return (
    <>
      <Link to={backLink.current}>Go Back</Link>
      {movie && (
        <div>
    <div className={css.container}>
      
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie img" width="300px"/>
      <div className={css.description}>
        <h1>{movie.title}</h1>
        <p>User Scores: {movie.vote_average}</p>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h2>Genres</h2>
        {movie.genres && (
          <ul>
            {movie.genres.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        )}
            </div>
            </div>
      <div className={css.adInfo}>
            <h2>Additional information</h2>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
        <Suspense fallback={<div>Loading infopage...</div>}>
            <Outlet />
          </Suspense>
        </div>
        
      )}
      </>
  );
}

export default MovieDetailsPage;
