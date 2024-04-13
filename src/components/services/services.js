import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTZlNTYwYmE2M2U5NDFiZDJlZTJlYjVmNTk3MjU5ZiIsInN1YiI6IjY2MTgwNWZjZDEzMzI0MDE4NmU0YmMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TG8Ee9q9xFftiqYrft3s2TBS_dxstMMtHFCnGj_IRp8',
  },
};

export const requestTrendingMovies = async () => {
  const { data } = await axios.get(
    'trending/movie/day?language=en-US',
    options
  );
  return data;
};

export const requestMovie = async query => {
  const { data } = await axios.get('search/movie', {
    ...options,
    params: { query },
  });
  return data;
};

export const requestMovieDetails = async id => {
  const { data } = await axios.get(`movie/${id}`, options);
  return data;
};

export const requestMovieCast = async id => {
  const { data } = await axios.get(`movie/${id}/credits`, options);
  return data;
};

export const requestMovieReviews = async id => {
  const { data } = await axios.get(`movie/${id}/reviews`, options);
  return data;
};