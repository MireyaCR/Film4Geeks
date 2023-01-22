import React,{useContext, useEffect, useState} from "react"
import { Context } from '../store/appContext';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import "../../styles/profile.css"
import { MyFavourites } from "../component/MyFavourites.jsx";
import { FilmsSeen } from "../component/FilmsSeen.jsx";
import { PendingMovies } from "../component/PendingMovies.jsx";
import { text } from "@fortawesome/fontawesome-svg-core";
import { HeroProfile } from "../component/HeroProfile.jsx";


export const Profile = () => {

    return (

        <div className="principal-color">

            <HeroProfile/>
            <hr></hr>
            
            <h3 className="text-center">My favourite films</h3>
                <MyFavourites/>
            <hr></hr>
                
            <h3 className="text-center">Films I want to see</h3>
                <PendingMovies/>
            <hr></hr>
            
            <h3 className="text-center">Films seen</h3>
                <FilmsSeen/>
            <hr></hr>
        </div>
    )
}