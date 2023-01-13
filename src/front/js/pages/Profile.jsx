import React,{useContext, useEffect, useState} from "react"
import { Context } from '../store/appContext';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import profileCss from "../../styles/profile.css"
import { MyFavourites } from "../component/MyFavourites.jsx";
import { FilmsWatched } from "../component/FilmsWatched.jsx";
import { PendingMovies } from "../component/PendingMovies.jsx";

export const Profile = () => {

    const {store, actions } = useContext(Context);
    const [genres, setGenres] = useState([])
    const [categories, setCategories] = useState([])
    const [percentages, setPercentages] =useState([])
   
    const typesGenres = {
        28:"action",
        12:"adventure",
        16:"animation",
        35:"comedy",
        80:"crime",
        99:"documentary",
        18:"drama",
        10751:"family",
        14:"fantasy",
        36:"history",
        27:"horror",
        10402:"music",
        9648:"mistery",
        10749:"romance",
        878:"science-fiction",
        10770:"TV movie",
        53:"thriller",
        10752:"war",
        37:"western"
    }

    console.log("esto es array>>>>>>>>>",store.seen)

    const funcion=()=>{
        let objetoCategorias = {}
        let categoryNames = []
        let percentageArray = []

        for(let i = 0; i<store.seen.length; i++) {
            if(store.seen[i][1] in objetoCategorias) {
                objetoCategorias[store.seen[i][1]] = objetoCategorias[store.seen[i][1]] +1
            }else {
                objetoCategorias[store.seen[i][1]] = 1 
            }
        }
        console.log("categorias valor diagrama",objetoCategorias)

        let arrayCategories= Object.keys(objetoCategorias)
        console.log("arraycategories",arrayCategories)

        for(let i=0; i<arrayCategories.length; i++) {
            let category = arrayCategories[i]
            //generar array de nombres categorias
            if(category in typesGenres ) {
               categoryNames.push(typesGenres[category])
            }else{
                categoryNames.push("Genre " + category)
            }
            //generar array de porcentajes
            let appearCount = objetoCategorias[category]
            let percentage = appearCount*100/store.seen.length
            percentageArray.push(percentage)
        }
        setCategories(categoryNames)
        setPercentages(percentageArray)
    }

    useEffect(()=> {
        setGenres(Object.keys(typesGenres))
        funcion()    
    },[store.seen])


    console.log("categorias>>", categories)

    const data= {
        labels: categories,
        datasets:[{   //porcentaje de cada uno e los parametros
            data:percentages,  //porcentajes
            backgroundColor: ["green","red","blue","orange","purple","brown","grey","pink"] //fondo
        }]
    }
    const options= {
        responsive:true
    }

    return (

        <div className="principal-color">
            <div className="d-flex">
                <div style={{width:"60%"}}>
                    <h3 className="line">Name: <h4 style={{color:"white"}} >David</h4></h3>
                    <h3 className="line">Email: <h4 style={{color:"white"}}>dagalisteo@gmail.com</h4></h3>
                </div>

                <div>
                    <h3>Your favourite Genders:</h3>
                <Pie className="mt-3" data={data} options={options} />
                </div>
            </div>

            <div>
                <h3>My favourite films</h3>
                <MyFavourites/>
            </div>

            <div>
                <h3>Films I want to see</h3>
                <PendingMovies/>
            </div>
            
            <div>
                <h3>Films watched</h3>
                <FilmsWatched/>
            </div>
        </div>
    )
}