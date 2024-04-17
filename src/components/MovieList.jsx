import { NavLink } from "react-router-dom"


const MovieList = ({trends}) => {
  return (
    <ul>
        {trends.map(movie => (
          <li key={movie.id}>
            {movie.id && (
              <NavLink to={`/movies/${movie.id}`}>{movie.original_title}</NavLink>
            )}
          </li>
        ))}
      </ul>
  )
}

export default MovieList
