import React, { useState, useContext } from "react";
import {Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import loginImage from "../../img/loginImage.png"
import loginCss from "../../styles/login.css"



export const Login = () => {

    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)

    const navigate = useNavigate()

    const handleClickSignUp = () => {
        navigate("/signUp")
    }

    console.log("This is your token", store.token)

    const handleClick = () => {
    if (isValidEmail && isValidPassword )

        actions.login(email, password)
        
    }

    if (store.token && store.token != "" && store.token != undefined){
        navigate("/")
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
                <img src={loginImage} className="img-fluid"  alt="..."/>
                </div>

                <div className="col bg-color">
                    <h1 className="text-center title">Login</h1>
                    {(store.token && store.token != "" && store.token !=undefined) ? ("You are logged") :(
                        
                        <div>
                            
                            <div className="p-2">
                                <h3>Email</h3>
                                <label ></label>
                                <input className="input" type="email"  placeholder="Email"/>
                                <input className={`form-control ${isValidEmail ? "" : "is-invalid"}`} required onBlur={handleBlurEmail} type = "text" id="email" placeholder="Email" onChange = {(e)=>setEmail(e.target.value)} value = {email}/>
                            </div>
                            <div className="p-2">
                                <h3>Password</h3>
                                <label></label>
                                <input className="input" type="password" placeholder="Password"/>
                                <input className={`form-control ${isValidPassword ? "" :"is-invalid"}`} required onBlur={handleBlurPassword} type ="password" id="password" placeholder="Password" onChange = {(e)=>setPassword(e.target.value)} value = {password}/>
                            </div>
                            
                            <div className="format" >
                                <button type="submit" className="button" onClick={handleClick}>Send</button>
                            </div>
                            
                        </div>

                    )}

                    <div className=" mt-4" >
                            <p className="ms-2">Forgot your Password?</p>
                    </div>

                    <div className="text-center mt-5">
                        <h3 className="register" onClick={handleClickSignUp}>Not user yet? Sign Up</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}
