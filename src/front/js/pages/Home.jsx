import React, {useContext, useEffect} from "react";
import Recommended from "../component/Recommended.jsx";
import Popular from "../component/Popular.jsx";
import Quotes from "../component/Quotes.jsx";
import ComingSoon from "../component/ComingSoon.jsx";
import NearestCinema from "../component/NearestCinema.jsx";
import 'react-alice-carousel/lib/alice-carousel.css';
import logo from "../../img/LOGO.png";
import {Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";

const API_IMAGE = 'https://image.tmdb.org/t/p/w500/'

const Home = () => {

	const {store, actions} = useContext(Context)
	const navigate = useNavigate()
	
	useEffect(() => {
	 	if(!store.token)
		navigate("/login")
	
	}, [store.token])

	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
	
	return (
		<section>
			
		<div className="banner bg-image">
			<div className="text-center">
			<img src={logo}  className="mt-4 logobanner"/> 
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
		<NearestCinema />
	
		</section>

	)
}

export default Home
