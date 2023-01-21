import React, {useContext,useEffect,useState} from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../styles/profileCards.css'
import { element } from "prop-types";

export const MyFavourites = () => {

    const {store, actions } = useContext(Context);
	const [favouriteFilms, setFavouriteFilms] = useState([]);

	useEffect(()=> {
		getFavourites()
	},[])
	
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




    return (
        <div className="container text-center d-flex flex-wrap justify-content-center">
            
				{
					favouriteFilms.map((favourite, index) => 
						<div key={index}>
							<div className='ind me-1'>
								<Link to={`/detailspopular/${favourite.film_id}`}>
									<img src={favourite.image_url} className='grid' style={{height:"10rem"}}/>
								</Link>
							</div> 
						</div>)
				}
         
     	</div>   

      
	)
}

    
