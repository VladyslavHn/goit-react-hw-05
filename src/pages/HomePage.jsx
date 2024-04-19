
import { useEffect, useState } from "react";
import { requestTrendingMovies } from "../components/services/services";
import Loader from '../components/Loader/Loader'
import toast from "react-hot-toast";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import MovieList from "../components/MovieList/MovieList";

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTrends() {
      setIsLoading(true);
      try {
        const { results } = await requestTrendingMovies();
        setTrends(results);
      } catch (error) {
        toast.error("This didn't work.");
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getTrends();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <h1>Trending today</h1>
      <MovieList trends={trends}/>
    </div>
  );
}

export default HomePage;
