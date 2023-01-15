import React, { useContext,useState } from "react";
// import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { API_IMAGE } from "/workspace/Film4Geeks/src/front/js/services/API_IMAGE.js"

import "../../styles/detailspopular.css";

const Detailspopular = () => {
    
    // const { store } = useContext(Context);
	let params = useParams()
    const [popularMovie, setPopularMovie] = useState(null);
	
    async function fetchMovieData() {
        const apiKey = process.env.TMDB_API;
        const url = `https://api.themoviedb.org/3/movie/${params.index}?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        setPopularMovie(data);
    }
    if (!popularMovie) {
        fetchMovieData();
        return <div>Loading...</div>;
    }              

	return (
        <div className="container mt-3">        
          <div className="row justify-content-center">
            <div className="col-md-6 col-12 p-1">
              <div className="row-image border-rounded position-relative">
                <img className="img-fluid" src={`${API_IMAGE}${popularMovie.poster_path}`} alt="image1" />
                <button className="play-button fas fa-play"></button>
              </div>
              <div className="row gutter">
                <div className="d-flex p-1">
                  <span className="fas fa-check-circle mr-3"></span>
                  <span className="fas fa-star mr-3"></span>
                  <span className="fas fa-flag mr-3"></span> 
                  <span className="far fa-clock"> {popularMovie.runtime} min. </span>                
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 p-1">
              
              <div className="p-1 reduced-line-height text-border-shine">
                <h5 className="mt-1 text-color-h5">{popularMovie.title}</h5>
                <p><small className="text-color-small">SYNOPSIS</small></p>   
                <p>{popularMovie.overview}</p> 
                <p><small className="text-color-small">FILM RATING</small></p>
                <p>{popularMovie.adult?`+18`:'All Audience'}</p>
                <p><small className="text-color-small">GENRE</small></p>                
                <p>nombre de los actores</p>
                <p><small className="text-color-small">DIRECTOR</small></p>
                <p>nombre del director</p>
                <p><small className="text-color-small">CASTING</small></p>
                <p>nombre de los actores</p>
              </div>
            </div>
          </div>
        </div>
      );
};
export default Detailspopular
