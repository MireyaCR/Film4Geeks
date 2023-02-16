import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import NavbarWelcome from "../component/NavbarWelcome.jsx";
import welcomeImage from "../../img/fondo.jpg"
import logoImage from "../../img/LOGO.png"
import "../../styles/welcome.css"

const Welcome = () => {

    const {store } = useContext(Context)

    return (
        <div>
            {
            store.token && store.token != "" && store.token != undefined ? 
                (
                <h2 className="text-welcome">You are logged</h2>
                ) :(
                    <div className="content">
                        <NavbarWelcome/>
                        <h1 className="title-welcome">Film4geeks</h1>
                        <h2 className="subtitle-welcome">The movie app you've always wanted</h2>
                        <div className="img-container" style={{backgroundImage: `url(${welcomeImage})`}}>
                            <div className="button-container">
                                <img className="logo" src={logoImage} />
                                <Link to="/login"><button className="button-welcome">Login</button></Link>
                                <Link to="/signup"><button className="button-welcome">Sign Up</button></Link>
                                
                                
                            </div>
                        </div>
                    </div>
                )
            } 
        </div>
    )
}

export default Welcome 