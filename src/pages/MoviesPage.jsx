import { useState, useEffect } from 'react';
import { requestMovie } from '../components/services/services';
import MovieSearchList from '../components/MovieSearchList/MovieSearchList';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';


function MoviesPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
   
  const [searchParams, setSearchParams] = useSearchParams();
  const paramQuery = searchParams.get('value');

  const handleSubmit = e => {
    e.preventDefault();
    const querySearch = e.target.elements.search.value.trim();
    setSearchParams({ value: querySearch });
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (!paramQuery) return;

    async function fetchMovie() {
      setIsLoading(true);
      try {
        const data = await requestMovie(paramQuery);
        if (data.results.length > 0) setMovies(data.results);
      } catch (error) {
        toast.error("This didn't work.");
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [paramQuery]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          name="search"
        />
        <button type="submit">Search</button>
      </form>
      <MovieSearchList movies={movies} defLocation="/movies" />
    </div>
  );
}

export default MoviesPage;