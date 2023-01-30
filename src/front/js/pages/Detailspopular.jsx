import React, {useContext, useEffect, useState} from "react";
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import { API_IMAGE } from "/workspace/Film4Geeks/src/front/js/services/API_IMAGE.js";
import { useNavigate } from "react-router-dom";
import {Context } from "../store/appContext"
import Toolbar_ from "../component/Toolbar_.jsx"
import Logo from "/workspace/Film4Geeks/src/front/img/LOGO.png"

import "../../styles/detailspopular.css";

const Detailspopular = () => {
  
  const {store, actions} = useContext(Context)

  let params = useParams();

  const navigate = useNavigate()
	
  
    
	useEffect(() => {
	 	if(!store.token)
		navigate("/login")
	
	}, [store.token])
  
  const [popularMovie, setPopularMovie] = useState(null);
  const [actorsMovie, setActorsMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [icon, setIcon] = useState('fa-play');
  
  useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

  useEffect(() => {
    async function fetchMovieData() {
      const apiKey = process.env.TMDB_API;
      const url = `https://api.themoviedb.org/3/movie/${params.index}?api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setPopularMovie(data);
    }
    if (!popularMovie) {
      fetchMovieData();
    }
  }, []);

  useEffect(() => {
    async function fetchActorsMovieData() {
      const apiKey = process.env.TMDB_API;
      const url = `https://api.themoviedb.org/3/movie/${params.index}/credits?api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setActorsMovie(data);
    }
    if (!actorsMovie) {
      fetchActorsMovieData();
    }
  }, []);

  useEffect(() => {
    async function fetchTrailler() {
      const apiKey = process.env.TMDB_API;
      const url = `https://api.themoviedb.org/3/movie/${params.index}/videos?api_key=${apiKey}&language=en-US`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setTrailer(data);
    }
    if (!trailer) {
      fetchTrailler();
    }
  }, []);

  if (!popularMovie) {
    return <div>Loading...</div>;
  }
  const genres = popularMovie.genres.map((value) => value.name).join(", ");

  let casting = "";
  let director = "";
  let trailerUrl = "";
  if (trailer) {
    trailerUrl = trailer?.results[0]?.key;
  }

  if (actorsMovie) {
    const filteredActors = actorsMovie.cast.filter(
      (actor, i) => actor.known_for_department === "Acting" && i < 10
    );
    casting = filteredActors.map((actor) => actor.name).join(", ");

    const filteredDirector = actorsMovie.crew.filter(
      (d) => d.job === "Director"
    );
    director = filteredDirector.map((d) => d.name).join(", ");
  }

  const handleClick = () => {
    setShowModal(showModal?false:true);
    if (icon === 'fa-play') {
        setIcon('fa-times');
    } else {
        setIcon('fa-play');
    }
};



  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-5 col-12 p-2">
          <div className="row-image border-rounded position-relative">
            <img className="img-fluid postal" src={`${API_IMAGE}${popularMovie.poster_path}`} onError={(e)=>{e.target.src=Logo}}type="image/png"/>     
            <button className="play-button" onClick={handleClick}>
            <i className={`fas ${icon}`}></i>       
            </button>            
          </div>
          <div className="row gutter">
            <div className=" d-flex flex-row mb-3">
              <Toolbar_ idFilm={popularMovie.id}></Toolbar_>
              <span className="far fa-clock ms-auto warning p-2 mt-1 fasize">
                {" "}
                {popularMovie.runtime} min.{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 p-2">
          <div className="p-3 reduced-line-height text-border-shine">
            <h5 className="mt-1 colortitle">{popularMovie.title}</h5>
            <h5 className="sizedate colortitle">{popularMovie.release_date}</h5>
            <p className="title-detail"><small className="text-color-small ">SYNOPSIS</small></p>
            <p>{popularMovie.overview}</p>
            {/* <p>
              <small className="text-color-small">RELEASE DATE</small>
            </p>
            <p >{popularMovie.release_date}</p> */}
            <p className="title-detail">
              <small className="text-color-small">GENRE</small>
            </p>
            <p>{genres}</p>
            <p className="title-detail">
              <small className="text-color-small">DIRECTOR</small>
            </p>
            <p>{director}</p>
            <p className="title-detail">
              <small className="text-color-small">CASTING</small>
            </p>
            <p>{casting}</p>
          </div>
        </div>
      </div>
      <Modal className="video-modal"
             isOpen={showModal}
             onRequestClose={handleClick}
             contentLabel="Video Modal"
             ariaHideApp={false}
            >
              <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${trailerUrl}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Modal>
    </div>
  );
};
export default Detailspopular;
