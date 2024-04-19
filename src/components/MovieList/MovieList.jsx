import { NavLink, useLocation } from "react-router-dom";

const MovieList = ({ trends }) => {
  const location = useLocation();

  return (
    <ul>
      {trends.map((movie) => (
        <li key={movie.id}>
          {movie.id && (
            <NavLink
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location }
              }}
            >
              {movie.original_title}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

