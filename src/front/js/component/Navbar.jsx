 
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/LOGO.png";

//include your index.scss file into the bundle
import "../../styles/navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar p-0 navbar-expand-sm sticky-top">
           <a className="navbar-brand p-2" href="#">
            <img src={logo} width={50} height={50}/>Films4Geeks</a>                
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon mt-1">
		        <i className="fas fa-bars"></i>
	         </span>
            </button>
           
           <div className="collapse navbar-collapse mx-0 justify-content-end" id="navbarSupportedContent" role="button">
              
                   <ul className="navbar-nav m-0" href="#">
                   <li className="nav-item active">
                       <Link className="nav-link link-warning " to={"/"}>Home<span className="sr-only">(current)</span></Link>
                   </li>
                   <li className="nav-item ">
                       <Link className="nav-link link-warning" to={"/profile"}>Profile</Link>
                   </li>
                   <li className="nav-item">
                       <a className="nav-link link-warning" href="#">Search</a>
                   </li>
                   <li className="nav-item">
                       <a className="nav-link link-warning" href="#">Starring</a>
                   </li> 
                   <li className="nav-item">
                     <i className="fa fa-power-off p-1"></i>
                   </li>                                          
               </ul>
               
           </div>
		</nav>
	);
};

export default Navbar;