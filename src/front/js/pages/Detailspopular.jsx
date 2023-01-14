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
            <img className="img-fluid" src={`https://image.tmdb.org/t/p/w500/${store.movies[params.index].poster_path}`} alt="image1" style={{width: "100%", height: "100%"}} />
            <button className="btn-sm rounded-pill border-warning fas fa-play position-absolute" style={{
                position: "absolute",
                top: "90%",
                left: "18%",
                transform: "translate(-50%, -50%)",
                zIndex: "1",
                width:"3em",
                height:"2em"
            }} />
        </div>

            <div className="row">
                <div >
                    <img src="" alt="Ver mas tarde" />
                    <img src="" alt="Visto" />
                    <img src="" alt="Favorito" />    
                </div>iconos de la izquierda       
                        <p><small>Duración:</small></p>Duración pelicula derecha
                </div>
            <div className="row ms-2"> sinopsis y estrellas
                <h1>SINOPSIS</h1>
                <div>
                    <button>
                        <i className="fas fa-star">e1</i>
                    </button>
                    <button>
                        <i className="fas fa-star">e2</i>
                    </button>
                    <button>
                        <i className="fas fa-star">e3</i>
                    </button>
                    <button>
                        <i className="fas fa-star">e4</i>
                    </button>
                    <button>
                        <i className="fas fa-star">e5</i>
                    </button>
                </div>estrellas de la derecha        
            </div>
            <div className="row ms-2">
                <p>{store.movies[params.index].overview}</p> 
                <h6>CLASIFICACION</h6>
                <p>generos: terror, comedia</p>
                <h6>DIRECTOR</h6>
                <p>nombre del director</p>
                <h6>REPARTO</h6>
                <p>nombre de los actores</p>
                <button>Critica(activo cuando haya escrito)</button>
                <input></input>
            </div>            
	</div>
    );
};
export default Detailspopular
