import React, {useContext, useEffect, useState} from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../styles/profileCards.css'
import { element } from "prop-types";

export const FilmsSeen = () => {

    const {store, actions } = useContext(Context);
	const [filmsSeen, setFilmsSeen] = useState([]);

	useEffect(()=> {
		getFilmsSeen()
	},[])
	
	const getFilmsSeen = async () => {
		const options = {
		  method: "GET",
		  headers: {
			Authorization: "Bearer " + store.token,
		  },
		};
		const url_to_get_seen =
		  process.env.BACKEND_URL + "/api/user/seen";
		const response = await fetch(url_to_get_seen, options);
		const data = await response.json();
		setFilmsSeen(data);
	};




    return (
		<div className="container text-center d-flex flex-wrap justify-content-center">
            
				{
					filmsSeen.map((seen, index) => 
						<div key={index}>
							<div className='ind me-1'>
								<Link to={`/detailspopular/${seen.film_id}`}>
									<img src={seen.image_url} className='grid' style={{height:"10rem"}}/>
								</Link>
							</div> 
						</div>)
				}
         	
			
     	</div>
    )
}