import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import Toolbar_ from "../component/Toolbar_.jsx";
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../styles/home.css';
import '../../styles/carrusel.css';

const API_IMAGE = 'https://image.tmdb.org/t/p/w500/'

const Popular = () => {
	

	const {store, actions } = useContext(Context);
	const responsive = {
		2000: {
		items: 7,
		},
		1200: {
		items: 5,
		},
		800: {
		items: 2,
		},
		0: {
		items: 1,
		},
	};

	return (
	
	<div className="container mt-5">
		<h3 className="mb-4 h3categorias">Most Popular...</h3>
		<div className="d-flex justify-content-around mx-2">
			<AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500"> 
			{store.movies.map((movie, index) => (   
			<div key={index}>   
				<div key={index} className='ind me-1'>
					<Link to={`/detailspopular/${movie.id}`}> 
						<img className="card-img-top postercarrusel" src={API_IMAGE+movie.poster_path} />
					</Link>  
				</div>
				<div className="d-flex justify-content-around p-1">
					<Toolbar_ idFilm={movie.id}></Toolbar_>						
				</div>
			</div>   
			))}
			</AliceCarousel>
		</div>
    </div>
    )
}

export default Popular

