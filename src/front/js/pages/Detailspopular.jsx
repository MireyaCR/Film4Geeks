import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const API_IMAGE = 'https://image.tmdb.org/t/p/w500/'

const Detailspopular = () => {

	const { store } = useContext(Context);
	let params = useParams()
	
	return (
        <div className="container">       
            <h1>{store.movies[params.index].title}</h1> 
            <div className="row ms-2">imagenes
                <img src={`https://image.tmdb.org/t/p/w500/${store.movies[params.index].poster_path}`} alt="POSTER"/> 
                <button>reproducir trailer</button>
                <img src="" alt="Cartel"/>                
            </div>  
            <div className="row ms-2">iconos derecha e izquierda
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
