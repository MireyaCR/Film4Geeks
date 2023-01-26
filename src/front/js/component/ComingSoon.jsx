import React, {useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Toolbar_ from "../component/Toolbar_.jsx"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHeart, faEye, faFlag, faCircleCheck } from '@fortawesome/free-solid-svg-icons'


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

	const handleAddSeen = (id) => {
		actions.setSeen(API_IMAGE+store.movie)
		actions.addDbSeen(id)
	}

	const handleAddFav = (id) => {
		actions.setFavourites(API_IMAGE+store.movie)
		actions.addDbFav(id)
	}

	const handleAddPending = (id) => {
		actions.setPending(API_IMAGE+store.movie)
		actions.addDbPending(id)
	}


	return (
	
	<div className="container mt-5">

		<h3 className="mb-4"style={{color:"rgb(241 6 6)",fontWeight:"bold"}}>Coming Soon...</h3>
		<div className="d-flex justify-content-around mx-2">
			<AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500"> 
			{store.comingSoon.map((movie, index) => (    
				<div key={index}> 
					<div key={index} className='ind me-1'>
					<Link to={`/detailspopular/${movie.id}`}>
						<img className="card-img-top" src={API_IMAGE+movie.poster_path} />
					</Link>
					</div>
					
					<div className="d-flex justify-content-around p-1">
					<Toolbar_ idFilm={movie.id}></Toolbar_>
					{/* {store.seen.includes(API_IMAGE+movie.poster_path) ? <span title="Already seen" className="added"><i className="fas fa-check-circle"></i></span> : (
						<button onClick={()=>{handleAddSeen(movie.id)}} className='seen' title="Add to your seen list"><i className="far fa-check-circle"></i></button>
						)}
						{store.favourites.includes(API_IMAGE+movie.poster_path) ? <span title="Added to favourites" className="added"><i className="fas fa-star"></i></span> : (
						<button onClick={()=>{handleAddFav(movie.id)}}  className='fav' title="Add to your favourites list"><i className="far fa-star"></i></button>
						)}
						{store.pending.includes(API_IMAGE+movie.poster_path) ? <span title="Added to movies I want to see" className="added"><i className="fas fa-flag"></i></span> : (
						<button onClick={()=>{handleAddPending(movie.id)}}  className='pended' title="Add to your pending list"><i className="far fa-flag"></i></button>
						)}  */}
				</div>
			</div>    
			))}
			</AliceCarousel>
		</div>
	</div>

	)
}

export default ComingSoon