import React, {useContext, useEffect, useState} from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../styles/profileCards.css'
import { element } from "prop-types";

export const PendingMovies = () => {

    const {store, actions } = useContext(Context);
	const [pending, setPending] = useState([]);

	useEffect(()=> {
		getPendingMovies()
	},[])
	
	const getPendingMovies = async () => {
		const options = {
		  method: "GET",
		  headers: {
			Authorization: "Bearer " + store.token,
		  },
		};
		const url_to_get_pending =
		  process.env.BACKEND_URL + "/api/user/pending";
		try {
			const response = await fetch(url_to_get_pending, options);
			const data = await response.json();
			setPending(data);
		} catch (error) {
			console.error('error pending movies', error)
		}
		
	};



    return (
		<div className="container text-center d-flex flex-wrap justify-content-center">
           
				{
					pending.map((pending, index) => 
						<div key={index}>
							<div className='ind me-1'>
								<Link to={`/detailspopular/${pending.film_id}`}>
									<img src={pending.image_url} className='grid' style={{height:"10rem"}}/>
								</Link>
							</div> 
						</div>)
				}
         	
			
     	</div> 
    )
}