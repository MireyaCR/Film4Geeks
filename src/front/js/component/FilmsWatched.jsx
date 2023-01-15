import React, {useContext} from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../styles/profileCards.css'


export const FilmsWatched = () => {

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
		<div className="container mt-5">
			<div className="d-flex justify-content-around mx-2">
				<AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500"> 
				{
				store.seen.map((seen, index) => 
					<div key={index}>
						<div key={index} className='ind me-1'>
							<Link to={`/details/${index}`}>	
								<img src={seen[0]} className='grid' style={{height:"400px"}}/>	
							</Link>
						</div>
					</div>	
				)
				}
				</AliceCarousel>
			</div>
		</div>
    )
}