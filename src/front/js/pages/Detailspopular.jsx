import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const API_IMAGE = 'https://image.tmdb.org/t/p/w500/'

const Detailspopular = () => {

	const { store } = useContext(Context);
	let params = useParams()
	console.log(store.movie)

	return (
        <div className="container mt-3">        
        <div className="row">
            <h5 className="mb-3">{store.movies[params.index].title}</h5>
         </div> 
         <div className="row border-rounded position-relative"style={{width: "400px", height: "500px"}}>
            <img className="img-fluid border-rounded" src={`https://image.tmdb.org/t/p/w500/${store.movies[params.index].poster_path}`} alt="image1" style={{width: "100%", height: "100%"}} />
            <button className="btn-sm rounded-pill border-warning fas fa-play position-absolute" style={{
                position: "absolute",
                top: "7%",
                left: "87%",
                transform: "translate(-50%, -50%)",
                zIndex: "1",
                width:"3em",
                height:"2em"
            }} />
        </div>

            <div className="row" style={{width: "400px", height: "500px"}}>
                <div >
                    <span className="fas fa-check-circle ml-2 p-1 float-left"></span>
                    <span className="fas fa-star ml-2 p-1 float-left"></span>
                    <span className="fas fa-flag ml-2 p-1 float-left"></span>  
                     
                    <span className="far fa-clock p-1 float-right"></span>                
                </div>
            </div>
            <div className="row ms-2"> 
                <h6>SYNOPSIS</h6>                
            </div>
            <div className="row ms-2">
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
