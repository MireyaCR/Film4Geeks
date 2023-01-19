import React, {  useContext, useState, useEffect} from "react";
import { Context } from '../store/appContext';


export const Prueba = () => {

    const {store, actions } = useContext(Context);
    const [films, setFilms] = useState([])
    const [popularMovie, setPopularMovie] = useState([])
    const [idsArray,setIdsArray] = useState([])
    
    let newArray = []
    

	const getFavourites= async () => {
        const options = {
            method:'GET',
            headers: {
                Authorization: "Bearer " + store.token
            }
        }
	 	const response = await fetch("https://3001-mireyacr-film4geeks-oaa7nhxlcsg.ws-eu83.gitpod.io/api/user/favourite",options)
	 	.then(response => (response.json()))
	 	.then(data => setFilms(data))
    
    }


    // const recorrerArrayIds = () => {   //funcion valida
    //     for(let i = 0; i<films.length; i++) {
    //         newArray.push(films[i].film_id)
    //         // console.log(films[i].film_id)
    //         // fetchMovieData(films[i].film_id)
    //         //console.log(newArray)
    //     }
    // return newArray
    // }


    
console.log("esto es dataZ>>>>>>>>>>>>>>>>>>>>>>>>>",films)
//console.log("ids array", idsArray)


        const recorrerArrayIds = () => {
            for(let i = 0; i<films.length; i++) {
                fetchMovieData(films[i].film_id)
            }
        }
    
        async function fetchMovieData(data2) {
          const apiKey = process.env.TMDB_API;
          const url = `https://api.themoviedb.org/3/movie/${data2}?api_key=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
          setPopularMovie(...popularMovie,data.poster_path);
        }
       

console.log("esto es el popular", popularMovie)













    return (
        <>
            <h2>hola</h2>
            <button onClick={ getFavourites}>hola</button>
            <button onClick={ ()=>setIdsArray(recorrerArrayIds)}>recorer</button>
        </>
    )
}