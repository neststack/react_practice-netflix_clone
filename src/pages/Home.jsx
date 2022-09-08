import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from '../components/Row';
import requests from '../Requests';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const movieDetailHandler = (movie) => {
    setMovie(movie);
  };

  useEffect(() => {
    setMovie(movies[Math.floor(Math.random() * movies.length)]);
  }, [movies]);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <>
      <div className='w-full h-[600px] text-white'>
        <div className='w-full h-full'>
          <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
          <img
            className='w-full h-full object-cover'
            loading='lazy'
            decoding='async'
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
          <div className='absolute w-full top-[20%] p-4 md:p-8'>
            <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
            <div className='my-4'>
              <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
                Play
              </button>
              <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
                Watch Later
              </button>
            </div>
            <p className='text-gray-400 text-sm'>
              Released: {movie?.release_date}
            </p>
            <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
              {truncateString(movie?.overview, 150)}
            </p>
          </div>
        </div>
      </div>
      <Row
        rowID='1'
        selectMovie={movieDetailHandler}
        title='UpComing'
        fetchURL={requests.requestUpcoming}
      />
      <Row
        rowID='2'
        selectMovie={movieDetailHandler}
        title='Popular'
        fetchURL={requests.requestPopular}
      />
      <Row
        rowID='3'
        selectMovie={movieDetailHandler}
        title='Trending'
        fetchURL={requests.requestTrending}
      />
      <Row
        rowID='4'
        selectMovie={movieDetailHandler}
        title='Top Rated'
        fetchURL={requests.requestTopRated}
      />
      <Row
        rowID='5'
        selectMovie={movieDetailHandler}
        title='Horror'
        fetchURL={requests.requestHorror}
      />
    </>
  );
};

export default Home;
