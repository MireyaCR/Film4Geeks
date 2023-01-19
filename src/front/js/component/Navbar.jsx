 
import React, {useContext} from "react";
import {Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/LOGO.png";

//include your index.scss file into the bundle
import "../../styles/navbar.css";

const Navbar = () => {

    const {store, actions} = useContext(Context)
    const navigate = useNavigate()

        const handleClick =() => {
            navigate("login")
            actions.logout()
        }


	return (
        <>
        {(store.token && store.token !="" && store.token!=undefined) ? (
            <nav className="navbar p-0 navbar-expand-sm sticky-top">
           <a className="navbar-brand p-2" href="#">
            <img src={logo} width={50} height={50}/>Films4Geeks</a>                
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon mt-1">
		        <i className="fas fa-bars"></i>
	         </span>
            </button>
           
           <div className="collapse navbar-collapse mx-0 justify-content-end" id="navbarSupportedContent" role="button">
              
           <ul className="navbar-nav m-0">
                   <li className="nav-item active">
                       <Link className="nav-link link-warning " to="/">Home</Link>
                   </li>
                   <li className="nav-item ">
                       <Link className="nav-link link-warning" to="/Profile">Profile</Link>
                   </li>
                    <li className="nav-item">
                       <Link className="nav-link link-warning" to="/Search">Search</Link>
                   </li>
                   <li className="nav-item">
                        <Link className="nav-link link-warning" to="#">Starring</Link>
                   </li> 
                  
                   <li className="nav-item">                   

                        <Link className="nav-link link-warning" to="#" onClick={handleClick}><i className="fa fa-power-off"></i></Link>
                   </li>
            </ul>
 dev
               
           </div>
		</nav>
        ) : (null) }

</>
	);
};

export default Navbar;