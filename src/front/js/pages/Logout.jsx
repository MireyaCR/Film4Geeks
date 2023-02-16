import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import welcomeImage from "../../img/fondo.jpg"
import "../../styles/logout.css"

const Logout = () => {

    const {store } = useContext(Context)

    return (
        <div>
            {
            store.token && store.token != "" && store.token != undefined ? 
                (
                <h2 className="text-logout">You are logged</h2>
                ) :(
                    <div className="content-logout">
                        <h1 className="title-logout">The End</h1>
                        <h2 className="subtitle-logout-first">Thanks for watching </h2>
                        <h2 className="subtitle-logout-second">Films4Geeks</h2>
                        <div className="img-container-logout" style={{backgroundImage: `url(${welcomeImage})`}}>
                            <div className="button-container-logout">
                                <Link to="/welcome"><button className="button-logout">Visit Again</button></Link>
                            </div>
                        </div>
                    </div>
                )
            } 
        </div>
    )
}

export default Logout