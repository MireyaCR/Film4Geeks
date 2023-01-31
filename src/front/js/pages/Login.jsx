import React, { useState, useContext, useEffect } from "react";
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

    useEffect(()=> {
       
        console.log("comprobacion token",store.token)
        if (store.token){
            navigate("/")
            console.log("llevo a home")
        }
       
    },[store.token])

    const navigate = useNavigate()

    const handleClickSignUp = () => {
        navigate("/signUp")
    }

    
    let login
    const handleClick = async () => {
        if(isValidEmail && isValidPassword )
            login = await actions.login(email, password)
            if(login ) {
                navigate("/")                
            }else {
                console.log("Inicio de sesión fallido");
            } 
    }

    
    


    let schemaEmail = yup.object().shape({
        email:yup.string().email()  //Valida que es un email al ponerle la extension de email
            .required("Required")
    })
    
    let schemaPassword = yup.object().shape({
        password:yup.string()
        .min(10,"Too short!")
        .max(15,"too long!")
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
                                {/* <input className="input" type="email"  placeholder="Email"/> */}
                                <input className={`input form-control ${isValidEmail ? "" : "is-invalid"}`} required onBlur={handleBlurEmail} type = "email" id="email" placeholder="Email" onChange = {(e)=>setEmail(e.target.value)} value = {email}/>
                                {!isValidEmail && (<div className="invalid-feedback">Email is invalid</div>)}
                            </div>
                            <div className="p-2">
                                <h3>Password</h3>
                                <label></label>
                                {/* <input className="input" type="password" placeholder="Password"/> */}
                                <input className={`input form-control ${isValidPassword ? "" :"is-invalid"}`} required onBlur={handleBlurPassword} type ="password" id="password" placeholder="Password" onChange = {(e)=>setPassword(e.target.value)} value = {password}/>
                                {!isValidPassword && (<div className="invalid-feedback">Password must be at least 10 characters long and alphanumeric </div>)}

                            </div>
                            
                            {/* <div className="format" > */}
                                <button type="submit" className="btnlogin" onClick={handleClick}>Send</button>
                            {/* </div> */}
                            
                        </div>

                    )}

                    

                    <div className="text-center mt-5">
                        <h3 className="register" onClick={handleClickSignUp}>Still not signed up? Click here.</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}

