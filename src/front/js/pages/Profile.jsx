import React,{useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
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

    const {store, actions} = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if(!store.token)
       navigate("/login")
   
   }, [store.token])
   
   useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
    return (

        <div >

            <HeroProfile/>
            <hr></hr>
            
            <h3 className="text-center py-2">My favourite films</h3>
                <MyFavourites/>
            <hr></hr>
                
            <h3 className="text-center py-2">Films I want to see</h3>
                <PendingMovies/>
            <hr></hr>
            
            <h3 className="text-center py-2">Films I have already seen</h3>
                <FilmsSeen/>
            <hr></hr>
        </div>
    )
}