import React, { useEffect, useState } from "react";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../styles/nearest.css'

const apiURL = process.env.GOOGLE_API

const NearestCinema = () => {
	const [currentLocation, setCurrentLocation] = useState({})
	const [type, setType] = useState([])
	

	const geoLocationJS = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const {latitude, longitude} = position.coords
			setCurrentLocation({latitude, longitude})
		})
	}

	  useEffect(() => {
		geoLocationJS()
	}, [])

	const fetchPlace = async () => {
		const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${apiURL}&location=${currentLocation.latitude},${currentLocation.longitude}&radius=1000000&type=movie_theater`;
		console.log(URL)
		const CONFIG = {
		  method: "GET",
		  headers: {
			"Content-type": "application/json"
		  }	
		}
		
		const response  = await fetch (URL, CONFIG)
		const json = await response.json();
		  //empty.push(json)
		console.log(">>types>>", json)
		
		setType(json.results)
	  
	  }


	useEffect(() => {
		fetchPlace()
	}, [currentLocation])

	const responsive = {
		2000: {
		items: 5,
		},
		1200: {
		items: 3,
		},
		800: {
		items: 2,
		},
		0: {
		items: 1,
		},
	};

	
	return (
		<div className="container" >
            	<h3 className="mb-4" style={{color:"rgb(241 6 6)",fontWeight:"bold"}}>Your nearest cinemas...</h3>
			<div className="d-flex justify-content-center mx-2" >
				<AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500" > 
				{type.map((place, index) => (    
						
						<div key={index} className=' me-1 d-flex justify-content-center'>
							
							<div  style={{height: '300px'}}>
									<h5 className="card-title text-center"style={{color:"#1c9eb8",fontWeight:"bold"}}>{place.name}</h5>
									<h6 className="text-center" > {place.vicinity}</h6>
									<div className="mt-1 p-2 d-flex justify-content-center text-center">
										<a href={`https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`} target="_blank" className="button-nearest">
												See on Google Maps
										</a>
									</div>
								</div>
						</div>
				  
				))}
				</AliceCarousel>
			</div>
	</div>

);
};

export default NearestCinema;