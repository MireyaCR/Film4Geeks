import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signUpImage from "../../img/signUpImage.png"
import signUp  from "../../styles/signUp.css"
import * as yup from "yup";

export const SignUp = () => {

    const navigate = useNavigate()
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)

    var info = {}

    const sendInfo = () => {
        info.name = document.getElementById("name").value
        info.email = document.getElementById("email").value
        info.password = document.getElementById("password").value
        console.log("Esta es mi info", info)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(info);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://3001-mireyacr-film4geeks-ny7zpzvsjog.ws-eu83.gitpod.io/api/signup", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


        if (isValidEmail && isValidPassword ){
            navigate("/login")
        }

    }



    let schemaEmail = yup.object().shape({
        email:yup.string().email()  //Valida que es un email al ponerle la extension de email
            .required("Required")
    })
    
    let schemaPassword = yup.object().shape({
        password:yup.string()
        .min(6,"Too short!")
        .max(10,"too long!")
        .required("Required")
    })
    
    const handleBlurEmail =(e)=> {
        schemaEmail.validate({email:e.target.value})
        .then(value => setIsValidEmail(true))
        .catch((error)=>{setIsValidEmail(false)})
    }
    
    const handleBlurPassword =(e)=> {
        schemaPassword.validate({password:e.target.value})
        .then(value => setIsValidPassword(true))
        .catch((error)=>{setIsValidPassword(false)})
    }



    return (
        <div className="fluid-container">

            <div className="row justify-content-center">
                <div className="col show-div color"  >
                <img src={signUpImage} className="img-fluid"  alt="..."/>
                </div>

                <div className="col bg-color">
                    <h1 className="text-center title">Sign Up</h1>
                    <form>
                        <div className="p-2">
                            <h3>Name</h3>
                            <label ></label>
                            <input className="input" type="text"  placeholder="Name" id="name"/>
                        </div>
                        
                        <div className="p-2">
                            <h3>Email</h3>
                            <label ></label>
                            {/* <input className="input" type="email"  placeholder="Email"/> */}
                            <input className={`input form-control ${isValidEmail ? "input" : "is-invalid"}`} required onBlur={handleBlurEmail} type = "email" id="email" placeholder="Email" />
                        </div>
                        <div className="p-2">
                            <h3>Password</h3>
                            <label></label>
                            {/* <input className="input" type="password" placeholder="Password"/> */}
                            <input className={`input form-control ${isValidPassword ? "" :"is-invalid"}`} required onBlur={handleBlurPassword} type ="password" id="password" placeholder="Password" />
                        </div>
                        {/* <div className="p-2">
                            <h3>Repeat Your Password</h3>
                            <label></label>
                            <input className="input mb-4" type="password" placeholder="Password"/>
                        </div> */}
                        
                        
                        {/* <div className="format" >  */}
                            <button onClick={()=>{sendInfo()}} type="submit" className="button" value="Send">Send</button>
                        {/* </div>  */}
                        
                    </form>
                    
                </div>
            </div>

        </div>
    )
}
    