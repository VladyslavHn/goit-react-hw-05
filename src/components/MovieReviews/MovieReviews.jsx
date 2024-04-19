import { useState, useEffect } from 'react';
import { requestMovieReviews } from '../services/services';
import { useParams } from 'react-router-dom';

function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const data = await requestMovieReviews(movieId);

        setReviews(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieReviews();
  }, [movieId]);
    
    if (reviews.length === 0) {
        return <p>There are no reviews for this movie</p>
        
    }

  return (
    <>
      {reviews && (
        <ul>
          {reviews.map(review => {
            return (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default MovieReviews;