import React, {useContext, useState, useEffect} from "react";
import { Context } from '../store/appContext';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import profileCss from "../../styles/profile.css"
import { text } from "@fortawesome/fontawesome-svg-core";


export const HeroProfile = () => {

    const {store, actions } = useContext(Context);
    const [userInfo, setUserInfo] = useState([])
    const [categories, setCategories] = useState([])
    const [percentages, setPercentages] =useState([])
    const [allGenres, setAllGenres] = useState([])

    
    useEffect(()=> {
        console.log("llamada getuserinfo")
        getUserInfo()
        
            
     },[])

// Llamada al backend
    const getUserInfo = async () => {
        const options = {
            method: "GET",
            headers: {
            Authorization: "Bearer " + store.token,
            },
        };
        const url_to_get_info =
          process.env.BACKEND_URL + "/api/user";
        const response = await fetch(url_to_get_info, options);
        const data = await response.json();
        setUserInfo(data);  
        console.log("userinfo:>>",data)   
        getGenres()

    };

        let genreObject = {}
        let percentageArray = []
        let count = 0
        const getGenres = () => {
            console.log("getgenres Userinfo",userInfo)
            for (let i = 0; i < userInfo.length; i++) {
                let currentItem = userInfo[i];
                if (typeof currentItem === "object" && currentItem.hasOwnProperty("genres")) {
                    count++
                    let genres = currentItem.genres;
                    for (let j = 0; j < genres.length; j++) {
                        if(genres[j].name in genreObject){
                            genreObject[genres[j].name] = genreObject[genres[j].name] +1
                        }else {
                         genreObject[genres[j].name]= 1      
                        }   
                    }
                }
            }
            for (const property in genreObject) {
                let appearCount = genreObject[property]
                let percentage = appearCount*100/count
                percentageArray.push(percentage)
            }
            let arrayCategories= Object.keys(genreObject)  
            setAllGenres(arrayCategories)
            setPercentages(percentageArray)
        }

   
    // console.log("percentaje", percentages)
    // console.log("genres",allGenres)


      
    
    
    
    
// Funcion diagrama
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


    // console.log("esto es userInfo",userInfo)
  


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
                        <h4 >Name: </h4><h5 style={{color:"white"}} >{userInfo[0]}</h5>
                        <h4 >Email: </h4><h5 style={{color:"white"}}>{userInfo[1]}</h5>
                    </div>
                </div>
                
                <div className="col-md-6 item m-2 p-2 reduced-line-height-left">
                    <h6 >Your favourite Genders:</h6>
                    <Pie  data={data} options={options} />
                </div>

            <button onClick={()=>{getUserInfo()}}>get user info</button>
            <button onClick={getGenres}>genres</button>
            </div>
    )
}