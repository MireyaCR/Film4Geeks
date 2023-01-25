import React, {useContext, useEffect,useState} from "react";
import { Context } from "../store/appContext";
import quotes from '/workspace/Film4Geeks/quotes.json'
import 'react-alice-carousel/lib/alice-carousel.css';

import '../../styles/home.css'

const Quotes = () => {

	const [quote, setQuote] = useState()

	useEffect(()=> {
		const quoteStart = Math.floor(Math.random()*quotes.length)
		setQuote(quotes[quoteStart])
	},[])

	return (
	
		<div className="text-center">
			<div>
				{
					quote ?
						<div className='quote'>
							<div className='column text-center'> 
								<h5 className="p-0"><i><strong>"{quote.quote}"</strong></i></h5>
								<h6><small>{quote.movie}-{quote.year}</small></h6>
								
							</div>
						</div>	
					:""	
				}
			</div>
		</div>
	)
}
export default Quotes