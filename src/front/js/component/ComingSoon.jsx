import React, {useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye, faFlag, faCircleCheck } from '@fortawesome/free-solid-svg-icons'


// import quotes from '/workspace/react-hello-webapp/quotes.json'
//import { Favorite, Visibility, Tour, CheckCircle} from "@mui/icons-material";



import '../../styles/home.css'

const API_IMAGE = 'https://image.tmdb.org/t/p/w500/'

const ComingSoon = () => {
	
	const sliceStart = Math.floor(Math.random()*15)
	const sliceend = sliceStart + 1
	const quoteStart = Math.floor(Math.random()*4)
	const quoteEnd = quoteStart + 1
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

		<h2 className="mb-4">Coming Soon...</h2>
		<div className="d-flex justify-content-around mx-2">
			<AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500"> 
			{store.comingSoon.map((movie, index) => (    
				<div key={index}> 
					<div key={index} className='ind me-1'>
					{/* <Link to={`/coming_soon/${index}`}> */}
						<img className="card-img-top" src={API_IMAGE+movie.poster_path} />
					{/* </Link> */}
					</div>
					
					<div className="d-flex justify-content-around p-1">
						 {store.seen.includes(API_IMAGE+movie.poster_path) ? <span title="Already seen" className="added"><i className="fas fa-check-circle"></i></span> : (
						<button onClick={() => actions.setSeen(API_IMAGE+movie.poster_path)} className='seen' title="Add to your seen list"><i className="far fa-check-circle"></i></button>
						)}
						{store.favourites.includes(API_IMAGE+movie.poster_path) ? <span title="Added to favourites" className="added"><i className="fas fa-star"></i></span> : (
						<button onClick={() => actions.setFavourites(API_IMAGE+movie.poster_path)} className='fav' title="Add to your favourites list"><i className="far fa-star"></i></button>
						)}
						{store.pending.includes(API_IMAGE+movie.poster_path) ? <span title="Added to movies I want to see" className="added"><i className="fas fa-flag"></i></span> : (
						<button onClick={() => actions.setPending(API_IMAGE+movie.poster_path)} className='pended' title="Add to your pending list"><i className="far fa-flag"></i></button>
						)} 
				</div>
			</div>    
			))}
			</AliceCarousel>
		</div>
	</div>

	)
}

export default ComingSoon