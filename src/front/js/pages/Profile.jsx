import React,{useContext, useEffect, useState} from "react"
import { Context } from '../store/appContext';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import profileCss from "../../styles/profile.css"
import { MyFavourites } from "../component/MyFavourites.jsx";
import { FilmsWatched } from "../component/FilmsWatched.jsx";
import { PendingMovies } from "../component/PendingMovies.jsx";
import { text } from "@fortawesome/fontawesome-svg-core";



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
            backgroundColor: [
            'rgba(255, 99, 132, 5)',
            'rgba(255, 159, 64, 5)',
            'rgba(255, 205, 86, 5)',
            'rgba(75, 192, 192, 5)',
            'rgba(54, 162, 235, 5)',
            'rgba(153, 102, 255, 5)',
            'rgba(201, 203, 207, 5)',
            'rgba(54, 162, 235, 5)',
            'rgba(255, 206, 86, 5)',
            'rgba(75, 192, 192, 5)',
            'rgba(153, 102, 255, 5)',
            'rgba(255, 159, 64, 5)',
            'rgba(255, 99, 132, 5)',
            'rgba(54, 162, 235, 5)',
            'rgba(255, 206, 86, 5)',
            'rgba(75, 192, 192, 5)',
            'rgba(153, 102, 255, 5)'
            ], //fondo
            borderColor:"rgb(255, 206, 71)",
        }]
    }
    const options= {
        responsive:true,
        aspectRatio:2, 
    }

    return (

        <div className="principal-color">
            
            <div className=" row justify-content-center align-items-center p-3 mx-3 mb-4 ">

                <div className="col-md-5">
                    <div className="avatars text-center reduced-line-height-left m-2 p-2 ">
                        <img src="https://source.boringavatars.com/beam/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51" alt=""/>
                    </div>

                    <div className="text-center m-2 p-2 reduced-line-height-right"  >
                        <h4 >Name: </h4><h5 style={{color:"white"}} >David</h5>
                        <h4 >Email: </h4><h5 style={{color:"white"}}>dagalisteo@gmail.com</h5>
                    </div>
                </div>
                
                <div className="col-md-6 item m-2 p-2 reduced-line-height-left">
                    <h6 >Your favourite Genders:</h6>
                    <Pie  data={data} options={options} />
                </div>

            </div>
            <hr></hr>
                    <h3 className="text-center">My favourite films</h3>
                    <MyFavourites/>
                    <hr></hr>
                
                    <h3 className="text-center">Films I want to see</h3>
                    <PendingMovies/>
                    <hr></hr>
            
                    <h3 className="text-center">Films watched</h3>
                    <FilmsWatched/>
                    <hr></hr>
        </div>
    )
}