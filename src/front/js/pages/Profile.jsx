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

    const [films, setFilms] = useState([])

    useEffect(() => {
        fetch("https://imdb-api.com/en/API/ComingSoon/k_1zlv93ae")
        .then((response) => response.json())
        .then((data) => {
          setFilms(data)
        });
    }, [])



 


   


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