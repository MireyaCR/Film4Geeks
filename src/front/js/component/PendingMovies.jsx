import React, {useContext, useState} from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../styles/profileCards.css'
import { element } from "prop-types";

export const PendingMovies = () => {

    const {store, actions } = useContext(Context);
	const [pending, setPending] = useState([]);
	
	const getPendingMovies = async () => {
		const options = {
		  method: "GET",
		  headers: {
			Authorization: "Bearer " + store.token,
		  },
		};
		const url_to_get_favorites =
		  process.env.BACKEND_URL + "/api/user/favourite";
		const response = await fetch(url_to_get_favorites, options);
		const data = await response.json();
		setPending(data);
	};


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
		<div className="text-center d-flex flex-wrap">
            <AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500"> 
				{
					pending.map((pending, index) => 
						<div key={index}>
							<div className='ind me-1'>
								<Link to={`/detailspopular/${pending.film_id}`}>
									<img src={pending.image_url} className='grid' style={{height:"400px"}}/>
								</Link>
							</div> 
						</div>)
				}
         	</AliceCarousel>
			<button onClick={() => {getPendingMovies();}}>Pending films</button>
     	</div> 
    )
}