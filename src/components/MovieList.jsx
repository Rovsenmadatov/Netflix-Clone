import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import api from '../Utils/api';
import { baseImgUrl } from '../constanst';

const MovieList = ({ genre }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const params = {
      with_genres: genre.id,
    };


    api
      .get('/discover/movie', { params })
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my-10">
      <h1 className="text-3xl font-semibold mb-3">{genre.name}</h1>

      <Splide
        options={{
          autoWidth: true,
          gap: '10px',
          pagination: false,
        }}
      >
        {movies.map((movie) => (
          <SplideSlide>
            <Link to={`/movie/${movie.id}`}>
              <img
                className="max-w-[300px] h-full cursor-pointer rounded"
                src={baseImgUrl + movie.poster_path}
                alt={movie.title}
              />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default MovieList;
