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
    const [prueba, setPrueba] = useState([])
 
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

    const contador = []
    const funcion=()=>{
       
        for(let i = 0; i<store.seen.length; i++) {
            for(let j=0; j<store.seen[i].length;j++){
            }
            contador.push(store.seen[i][1])
            
        }
        return contador
    }

    const funcion2 = (array) => {
        const array3 = array.join()
        return array3
    }
    const var4 = [funcion2(prueba)]
    console.log("esto es el var4",var4)

    const funcion3 = (array) => {
        for(let i=0; i<array.length; i++) {
            if(array[i].includes("16")) {
                return "animation"
            }
        }
    }

    const var5 =funcion3(var4)
    
    useEffect(()=> {
        setGenres(Object.keys(typesGenres))
        setPrueba(funcion())
        
    },[store.seen])

    console.log("genres",genres)
    console.log("store.seen",store.seen)

  console.log("esto es prueba",prueba)
  console.log("este es var5",var5)

 

    const data= {
        labels: [var5],
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