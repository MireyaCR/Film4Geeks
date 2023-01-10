 
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/LOGO.png";

//include your index.scss file into the bundle
import "../../styles/navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-sm fixed-top">
           <a className="navbar-brand p-2" href="#">
            <img src={logo} width={50} height={50}/>Film4Geeks</a>                
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon">
		        <i className="fas fa-bars"></i>
	         </span>
            </button>
           
           <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent" role="button">
               <a className="navbar-brand"></a>
                   <ul className="navbar-nav" href="#">
                   <li className="nav-item active">
                       <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
                   </li>
                   <li className="nav-item ">
                       <a className="nav-link " href="#">Profile</a>
                   </li>
                   <li className="nav-item">
                       <a className="nav-link" href="#">Search</a>
                   </li>
                   <li className="nav-item">
                       <a className="nav-link" href="#">Starring</a>
                   </li>              
               </ul>
           </div>
		</nav>
	);
};

export default Navbar;