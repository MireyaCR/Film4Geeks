import React, {  useContext, useState, useEffect} from "react";
import { Context } from '../store/appContext';




export const Prueba = () => {

    const {store, actions } = useContext(Context);
    const [films, setFilms] = useState([])
    const [popularMovie, setPopularMovie] = useState([])
    
	const getFavourites= async () => {

        const options = {
            method:'GET',
            headers: {
                Authorization: "Bearer " + store.token
            }
        }

	 	const response = await fetch("https://3001-mireyacr-film4geeks-oaa7nhxlcsg.ws-eu82.gitpod.io/api/user/favourite",options)
        
	 	.then(response => (response.json()))
	 	.then(data => setFilms(data))

        
        
}

    const recorrer = () => {
        for(let i = 0; i<films.length; i++) {
            console.log(films[i].film_id)
            fetchMovieData(films[i].film_id)
        }
}
    console.log("esto es dataZ>>>>>>>>>>>>>>>>>>>>>>>>>",films)
    


        async function fetchMovieData(data2) {
          const apiKey = process.env.TMDB_API;
          const url = `https://api.themoviedb.org/3/movie/${data2}?api_key=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
          setPopularMovie(data);
        }
       
      console.log("esto es el popular",popularMovie)
      const recorrer2 = () => {
        for(let i=0; i<popularMovie.length; i++) {
            console.log(popularMovie[i])
        }
    }

    return (
        <>
        <h2>hola</h2>
        <button onClick={ getFavourites}>hola</button>
        <button onClick={ recorrer}>recorer</button>
        <button onClick={ fetchMovieData}>movies</button>
        <button onClick={ recorrer2}>recorrer2</button>


               

        </>
    )
}