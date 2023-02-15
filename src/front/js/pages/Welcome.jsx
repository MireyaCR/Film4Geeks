import React from "react";
import welcomeImage from "../../img/fondo.jpg"
import logoImage from "../../img/LOGO.png"
import "../../styles/welcome.css"

const Welcome = () => {

    return (
        <div className="content">
            <h1 className="title-welcome">Film4geeks</h1>
        <div className="img-container" style={{backgroundImage: `url(${welcomeImage})`}}>
            <div className="button-container">
                <button className="button-welcome">Login</button>
                <button className="button-welcome">Registrer</button>
                <img className="logo" src={logoImage} />
            </div>
        </div>
    </div>
    )
}

export default Welcome 