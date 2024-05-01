import React from 'react'
import Header from "./Header";
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addNowPlayingMovies } from '../utils/movieSlice';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
// import useNowPlayingMovies from '../hooks/useNowPlayingMovies';

const Browse = () => {
  //1 useNowPlayingMovies(); can replace //1 with this one hookCall.
   const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    // const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1",API_OPTIONS)
    const data = await import('../utils/movieList.json');
    dispatch(addNowPlayingMovies(data));
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
 //1
  return (
    <div>
      <Header></Header>
        <MainContainer></MainContainer>
        <SecondaryContainer></SecondaryContainer>
        {/* 
          MainContainer
            videoBackground
            vedeoTitle
          SecondaryContainer
            MovieList * n
            cards *n  
        */}
      
    </div>
  )
}

export default Browse