import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import quotes from '/workspace/Film4Geeks/quotes.json'
import 'react-alice-carousel/lib/alice-carousel.css';



import '../../styles/home.css'

const Quotes = () => {
	
	const quoteStart = Math.floor(Math.random()*quotes.length)
	const quoteEnd = quoteStart + 1
	const {store, actions } = useContext(Context);


	return (
	
	<div className="text-center">
	
		<div>
			{
				quotes.slice(quoteStart, quoteEnd).map((quote, index) => {
					return (
					<div key={index} className='quote'>
						<div className='column'> 
							<span className="p-0"><i>"{quote.quote}"</i></span><br></br>
							<span>{quote.movie}</span><br></br>
							<span>{quote.year}</span>
						</div>
					</div>	
					)
				})
			}
		</div>
	</div>

	)
}

export default Quotes