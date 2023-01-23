import React, {useContext, useState, useEffect} from "react";
import { Context } from '../store/appContext';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import profileCss from "../../styles/profile.css"
import { text } from "@fortawesome/fontawesome-svg-core";
import { all } from "axios";

export const HeroProfile = () => {
    const {store, actions } = useContext(Context);
    const [userInfo, setUserInfo] = useState([])
    const [categories, setCategories] = useState([])
    const [percentages, setPercentages] =useState([])
    const [allGenres, setAllGenres] = useState([])

    useEffect(()=> {
        getUserInfo()
     },[])

// Llamada al backend
    const getUserInfo =  () => {
        const options = {
            method: "GET",
            headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const url_to_get_info =
          process.env.BACKEND_URL + "/api/user";
          fetch(url_to_get_info, options)
          .then(response => response.json())
          .then((data )=> {
            setUserInfo(data);  
            getGenres()  
          } );
    };

        
    const getGenres = () => {
        let percentageArray = []
        let count = 0
        let genreArray = []

        console.log("hero",userInfo)
        if (userInfo?.genres?.genres) {
            for (let i = 0; i < userInfo.genres.genres.length; i++) {
                genreArray.push(userInfo.genres.genres[i]);
            }
                
            let sum = userInfo.genres.genres_data.reduce((a, b) => a + b, 0);
                userInfo.genres.genres_data.forEach(function(value, i) {
                let percent = (value / sum) * 100;
                percentageArray.push(percent)
            });
            setAllGenres(genreArray)
            setPercentages(percentageArray)    
        }
    }

    console.log("esto es userInfo",userInfo)
  
// Atributos de Pie
    const data= {
        labels: allGenres,
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
        <div className=" row justify-content-center align-items-center p-3 mx-3 mb-4 ">

                <div className="col-md-5">
                    <div className="avatars text-center reduced-line-height-left m-2 p-2 ">
                        <img src="https://source.boringavatars.com/beam/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51" alt=""/>
                    </div>

                    <div className="text-center m-2 p-2 reduced-line-height-right"  >
                        <h4 >Name: </h4><h5 style={{color:"white"}} >{userInfo.name}</h5>
                        <h4 >Email: </h4><h5 style={{color:"white"}}>{userInfo.email}</h5>
                    </div>
                </div>

                <div className="col-md-6 item m-2 p-2 reduced-line-height-left">
                    <h6 >Your favourite Genders:</h6>
                    <Pie  data={data} options={options} />
                    <button style={{borderRadius:"10%", backgroundColor:"#ffa500"}} onClick={getGenres}>Ver info</button>
                </div>

        </div>
    )
}