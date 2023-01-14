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
							<div className='column'> 
								<span className="p-0"><i>"{quote.quote}"</i></span><br></br>
								<span>{quote.movie}</span><br></br>
								<span>{quote.year}</span>
							</div>
						</div>	
					:""	
				}
			</div>
		</div>
	)
}
export default Quotes