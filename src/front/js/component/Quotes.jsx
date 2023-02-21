import React, { useEffect,useState} from "react";
import quotes from '../../../../quotes.json'
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
								<h6 className="p-0"><i><strong>"{quote.quote}"</strong></i></h6>
								<h6><small>{quote.movie}, {quote.year}</small></h6>
								
							</div>
						</div>	
					:""	
				}
			</div>
		</div>
	)
}
export default Quotes