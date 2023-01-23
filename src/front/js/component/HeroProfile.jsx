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
    const [percentages, setPercentages] =useState([])
    const [allGenres, setAllGenres] = useState([])
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    var info = {}

    useEffect(()=> {
        getUserInfo()
    },[show])


// Llamada al backend
    const getUserInfo = async () => {
        const options = {
            method: "GET",
            headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };
        const url_to_get_info =
            process.env.BACKEND_URL + "/api/user";
            try{
            const response = await fetch(url_to_get_info, options)
            const data = await response.json();
            setUserInfo(data);
            console.log("funcion get genres llamada", userInfo);
            getGenres();
            }catch (error) {      
  }}

  
    const getGenres = () => {
        let percentageArray = []
        let genreArray = []

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

    
    const putName = () => {
        info.name = document.getElementById("name").value
        console.log("Esta es mi info", info)
        var myHeaders = new Headers();
        var requestOptions = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token   
        },
        body: JSON.stringify({
            name : info.name,
        }),
        redirect: 'follow'
        };
        fetch(process.env.BACKEND_URL+"/api/name", requestOptions)
        .then(response => response.text())
        .then(result => {
            result
            setShow(false)
        })
        .catch(error => console.log('error', error));   
    }

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
                        <h4 >Name: </h4><h5 style={{color:"white"}} >{userInfo.name} <i 
                                                                                        onClick={()=>setShow(true)} className="fas fa-edit" style={{color:"#ffa500"}}
                                                                                        ></i>
                                                                                            {show ? 
                                                                                            <div><input onChange = {(e)=>setName(e.target.value)} value = {name} type= "text" id = "name" /><i className="fas fa-times" onClick={()=>setShow(false)}></i><i className="fas fa-check" onClick={putName}></i></div>
                                                                                            :""}</h5>
                        <h4 >Email: </h4><h5 style={{color:"white"}}>{userInfo.email}</h5>
                    </div>
                </div>

                <div className="col-md-6 item m-2 p-2 reduced-line-height-left">
                    <h6 >Your favourite Genders:</h6>
                    <Pie  data={data} options={options} />
                </div>
        </div>
    )
}