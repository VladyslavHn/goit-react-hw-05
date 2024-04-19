import { useState, useEffect } from 'react';
import { requestMovieCast } from '../services/services';
import { useParams } from 'react-router-dom';

function MovieCast() {
    const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState(null);

  useEffect(() => {
    async function fetchMovieCaste() {
      try {
        const data = await requestMovieCast(movieId);

        setMovieCast(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieCaste();
  }, [movieId]);

  return (
    <>
      {movieCast && (
        <ul>
          {movieCast.cast.map(actor => {
            return (
              <li key={actor.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  width="100px"
                />
                <p>{actor.name}</p>
                <p>Character:{actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default MovieCast;