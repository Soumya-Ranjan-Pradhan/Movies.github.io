import React,{ useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {API_URL} from "./context";
import { NavLink } from 'react-router-dom';

const SingleMovies = () => {
    const {id} = useParams()   
     
    const [isLoading, setIsLoading] = useState(true)
const [movie, setMovie] = useState("")

    // 5th Writing
const getMovies = async(url) =>{
    try{
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data)
        if(data.Response === "True"){
            setIsLoading(false);
            setMovie(data);
        }
    }catch(error){
        console.log(error)
    }
}


// 4th Writing 
useEffect(()=>{
    // 7th Writing
  const timerOut = setTimeout(()=>{
        getMovies(`${API_URL}&i=${id}`);
    },5000)

    return() => clearTimeout(timerOut)
    // getMovies(`${API_URL}&s=${query}`);
},[id])

if (isLoading) {
  return (
    <section className="movie-section">
    <div className='loading'>
      <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G.........</span>
            </div>
    </section>
  );
}
  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default SingleMovies