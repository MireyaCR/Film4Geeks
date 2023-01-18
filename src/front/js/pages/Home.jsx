import React, {useContext, useEffect} from "react";
import Recommended from "../component/Recommended.jsx";
import Popular from "../component/Popular.jsx";
import Quotes from "../component/Quotes.jsx";
import ComingSoon from "../component/ComingSoon.jsx";
import NearestCinema from "../component/NearestCinema.jsx";
// import NearestCinema from "../component/NearestCinemas.jsx";
// import 'react-alice-carousel/lib/alice-carousel.css';
import logo from "../../img/LOGO.png";
import {Context } from "../store/appContext"

const API_IMAGE = 'https://image.tmdb.org/t/p/w500/'

const Home = () => {

	// const {store, actions} = useContext(Context)

	// useEffect(() => {
	// 	if(store.token){actions.appendToken()}
	
	// 	}, [store.token])
	
	return (
		<section>
			{/* <p>{store.message}</p> */}
		<div className="banner bg-image">
			<div className="text-center">
			<img src={logo} style={{height: "15rem"}} className="mt-4"/> 
			<h2>Films4Geeks</h2>
			<Quotes />
			</div>
		</div>
		<hr></hr>
		<Popular />
		<hr></hr>
		<ComingSoon />
		<hr></hr>
		<Recommended />
		<hr></hr>
		{/* <NearestCinema /> */}
	
		</section>

	)
}

export default Home
