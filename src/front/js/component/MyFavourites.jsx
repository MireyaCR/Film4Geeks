import React, {useContext} from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../styles/profileCards.css'


export const MyFavourites = () => {

    const {store, actions } = useContext(Context);

	

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
    //     <div className="text-center d-flex flex-wrap">
    //         <AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500"> 
    //     {
	// 		store.favourites.map((favourite, index) => 
				 
    //             <div key={index}>
    //                     <div className='ind me-1'>
	// 						<Link to={`/details_favourites/${index}`}>
	// 							<img src={favourite} className='grid' style={{height:"400px"}}/>
	// 						</Link>
    //                     </div> 
    //             </div>
	// 		)
	// 	}
    //     </AliceCarousel>
    // </div>

		<div className="container mt-5">
			<div className="d-flex mx-2">
				<AliceCarousel responsive={responsive} autoPlay autoPlayInterval="1500"> 
					{
					store.favourites.map((favourite, index) => (   
						<div key={index}>   
							<div key={index} className='ind'>
								{/* <Link to={`/details/${index}`}> */}
									<img className='grid' style={{height:"15rem"}} src={favourite}/>
								{/* </Link>  */}
							</div>
						</div>   
					))}
				</AliceCarousel>
			</div>
		</div>
	)
}

    
