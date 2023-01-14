import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { API_IMAGE } from "/workspace/Film4Geeks/src/front/js/services/API_IMAGE.js"

import "../../styles/detailspopular.css";
const Detailspopular = () => {

	const { store } = useContext(Context);
	let params = useParams()
	console.log(store.movie)

	return (
        <div className="container mt-3">        
        <div className="row">
            <h5 className="mb-3">{store.movies[params.index].title}</h5>
         </div> 
            <div className="row-image border-rounded position-relative">
            <img className="img-fluid" src={`${API_IMAGE}${store.movies[params.index].poster_path}`} alt="image1"/>
            <button className="play-button fas fa-play"></button>
        </div>
        <div className="row" style={{width: "400px", height: "45px"}}>
            <div>
                <span className="fas fa-check-circle ml-3 mt-1 p-2"></span>
                <span className="fas fa-star ml-3 mt-1 p-2"></span>
                <span className="fas fa-flag ml-3 mt-1 p-2"></span> 
                <span className="far fa-clock mt-1 p-2"></span>                
            </div>
        </div>
        <div className="row mt-2"> 
            <h6>SYNOPSIS</h6>                
        </div>
        <div className="row ">
            <p>{store.movies[params.index].overview}</p> 
            <h6>FILM RATING</h6>
            <p>clasificación</p>
            <h6>GENRE</h6>                
            <p>nombre de los actores</p>
            <h6>DIRECTOR:</h6>
            <p>nombre del director</p>
            <h6>CASTING</h6>
            <p>nombre de los actores</p>
         </div>            
	</div>
    );
};
export default Detailspopular
