// MovieDetailsPage.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { requestMovieDetails } from "../components/services/services";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { useParams } from "react-router-dom"; 

function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);
  const { movieId } = useParams(); 

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
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie img" />
      <div>
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
  );
}

export default MovieDetailsPage;
