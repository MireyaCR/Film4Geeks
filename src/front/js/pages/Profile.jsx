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

    const typesGenres = {
        "action":28,
        "adventure":12,
        "animation":16,
        "comedy":35,
        "crime":80,
        "documentary":99,
        "drama":18,
        "family":10751,
        "fantasy":14,
        "history":36,
        "horror":27,
        "music":10402,
        "mistery":9648,
        "romance":10749,
        "science-fiction":878,
        "TV movie":10770,
        "thriller":53,
        "war":10752,
        "western":37
    }

    console.log("esto es array>>>>>>>>>",store.seen)

    
 
    useEffect(()=> {
    //     setGenres(Object.keys(typesGenres))
    //     for(let i = 0; i<store.seen.length; i++) {
    //         for(let j=0; j<store.seen[i].length;j++){
    //             if(store.seen[i][1]===genres) {
    //                  console.log(store.seen[i][1])
    //             }
                
    //         }
    //     }

    Object.entries(typesGenres)
    .forEach(([key,value])=> {
        if(key[value]==store.seen) {
            console.log(value)
        }
    })

    },[store.seen])

  

   

   

   

    const data= {
        labels: ["adventure","terror","thriller","action"],
        datasets:[{   //porcentaje de cada uno e los parametros
            data:[75.65, 80, 87,99 ],  //porcentajes
            backgroundColor: ["green","red","yellow","#D29435"] //fondo
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