import React, {useContext} from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


export const MyFavourites = () => {

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
        <div className="text-center d-flex flex-wrap">
            <AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500"> 
        {
			store.favourites.map((favourite, index) => 
				 
                <div key={index}>
                        <div>
							<Link to={`/details/${index}`}>
								<img src={favourite} className='grid' style={{height:"400px"}}/>
							</Link>
                        
                        </div>
                        <button onClick={() => actions.removeFavourite(favourite)} key={index} className='remove-fav'>Borrar</button>
                 </div>
				
			)
		}
        </AliceCarousel>
    </div>
    )
}