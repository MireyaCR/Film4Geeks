import React from "react";
import SignUpImage from "../../img/registrer.png"
import signUpCss from "../../styles/signUp.css"


export const SignUp = () => {
    return (
        <div className="fluid-container">

            <div className="row justify-content-center">
                <div className="col show-div color"  >
                <img src={SignUpImage} className="img-fluid"  alt="..."/>
                </div>

                <div className="col bg-color">
                    <h1 className="text-center title">Sign Up</h1>
                    <form>
                        <div className="p-2">
                            <h3>Name</h3>
                            <label ></label>
                            <input className="input" type="text"  placeholder="Email"/>
                        </div>
                        
                        <div className="p-2">
                            <h3>Email</h3>
                            <label ></label>
                            <input className="input" type="email"  placeholder="Email"/>
                        </div>
                        <div className="p-2">
                            <h3>Password</h3>
                            <label></label>
                            <input className="input" type="password" placeholder="Password"/>
                        </div>
                        <div className="p-2">
                            <h3>Repeat Your Password</h3>
                            <label></label>
                            <input className="input mb-4" type="password" placeholder="Password"/>
                        </div>
                        
                        
                        <div className="format" >
                            <input type="submit" className="button" value="Send"/>
                        </div>
                        
                    </form>

                   

                    
                </div>
            </div>

        </div>
    )
}
    
