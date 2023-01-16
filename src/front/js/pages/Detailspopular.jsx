import React, { useContext,useState } from "react";

import { useParams } from "react-router-dom";
import { API_IMAGE } from "/workspace/Film4Geeks/src/front/js/services/API_IMAGE.js"

import "../../styles/detailspopular.css";

const Detailspopular = () => {
    
	let params = useParams()
    const [popularMovie, setPopularMovie] = useState(null);
    const [actorsMovie, setActorsMovie]=useState(null);
	
    async function fetchMovieData() {
        const apiKey = process.env.TMDB_API;
        const url = `https://api.themoviedb.org/3/movie/${params.index}?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setPopularMovie(data);
    }
    async function fetchActorsMovieData() {
        const apiKey = process.env.TMDB_API;
        const url = `https://api.themoviedb.org/3/movie/${params.index}/credits?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        setActorsMovie(data);
    }
    if (!popularMovie) {
        fetchMovieData();
        fetchActorsMovieData();
        return <div>Loading...</div>;
    }              
    const genre = popularMovie.genres.map(function (value) {        
        return value.name; 
    });
    const genres = genre.join(',')

    //  const filteredActors = actorsMovie.cast.filter(actor => actor.known_for_department === "Acting");
    //  const casting = filteredActors.map(actor => actor.name).join(', ');

    // const filteredDirector = actorsMovie.filter(name => cast.known_for_department === "Directing");
    // const director = filteredActors.map(director =>filteredDirector.name).join(', ');
    
	return (
        <div className="container mt-3">        
          <div className="row justify-content-center">
            <div className="col-md-5 col-12 p-2">
              <div className="row-image border-rounded position-relative">
                <img className="img-fluid" src={`${API_IMAGE}${popularMovie.poster_path}`} alt="image1" />
                <button className="play-button fas fa-play"></button>
              </div>
              <div className="row gutter">
                <div className=" d-flex bd-highlight mb-3">
                  <span className="fas fa-check-circle p-2 bd-highlight"></span>
                  <span className="fas fa-star p-2 bd-highlight"></span>
                  <span className="fas fa-flag p-2 bd-highlight"></span> 
                  <span className="far fa-clock ml-auto p-2 bd-highlight"> {popularMovie.runtime} min. </span>                
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 p-2">              
              <div className="p-1 reduced-line-height text-border-shine">
                <h5 className="mt-1 text-color-h5">{popularMovie.title}</h5>
                <p><small className="text-color-small">SYNOPSIS</small></p>   
                <p>{popularMovie.overview}</p> 
                <p><small className="text-color-small">FILM RATING</small></p>
                <p>{popularMovie.adult?`+18`:'All Audience'}</p>
                <p><small className="text-color-small">GENRE</small></p>                
                <p>{genres}</p>
                <p><small className="text-color-small">DIRECTOR</small></p>
                <p>nombre del director</p>
                <p><small className="text-color-small">CASTING</small></p>
                <p>casting</p>
              </div>
            </div>
          </div>
        </div>
      );
};
export default Detailspopular
