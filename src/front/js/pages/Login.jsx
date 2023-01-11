import  React from "react"
import { useNavigate } from "react-router-dom";
import loginImage from "../../img/loginImage.png"
import loginCss from "../../styles/login.css"



export const Login = () => {
    const navigate = useNavigate()

    const handleClickSignUp = () => {
        navigate("/signUp")
    }

    return (
        <div className="fluid-container">

            <div className="row justify-content-center">
                <div className="col show-div color"  >
                <img src={loginImage} className="img-fluid"  alt="..."/>
                </div>

                <div className="col bg-color">
                    <h1 className="text-center title">Login</h1>
                    <form>
                        
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
                        
                        <div className="format" >
                            <input type="submit" className="button" value="Send"/>
                        </div>
                        
                    </form>

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
