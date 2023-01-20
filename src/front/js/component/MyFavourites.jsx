import React, {useContext,useState} from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../styles/profileCards.css'
import { element } from "prop-types";

export const MyFavourites = () => {

    const {store, actions } = useContext(Context);
	const [favouriteFilms, setFavouriteFilms] = useState([]);
	
	const getFavourites = async () => {
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
		setFavouriteFilms(data);
	};


    const responsive = {
		2000: {
		items: 10,
		},
		1200: {
		items: 10,
		},
		800: {
		items: 10,
		},
		0: {
		items: 10,
		},
	};

    return (
        <div className="text-center d-flex flex-wrap">
            <AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500"> 
				{
					favouriteFilms.map((favourite, index) => 
						<div key={index}>
							<div className='ind me-1'>
								<Link to={`/detailspopular/${favourite.film_id}`}>
									<img src={favourite.image_url} className='grid' style={{height:"400px"}}/>
								</Link>
							</div> 
						</div>)
				}
         	</AliceCarousel>
			<button onClick={() => {getFavourites();}}>My favourites</button>
     	</div>   

      
	)
}

    
