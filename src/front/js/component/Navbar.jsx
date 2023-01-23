 
import React, {useContext, useState, useEffect} from "react";
import {Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/LOGO.png";

//include your index.scss file into the bundle
import "../../styles/navbar.css";

const Navbar = () => {

    const {store, actions} = useContext(Context)

    const [theme, setTheme] = useState('dark');
    const navigate = useNavigate()

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
     
	const toggleTheme = () => {
		if (theme === 'light') {
		setTheme('dark');
		} else {
		setTheme('light');
		};

	}
	
    const handleClick =() => {
        navigate("login")
        actions.logout()
    }


	return (
        <>
        {(store.token && store.token !="" && store.token!=undefined) ? (
        <nav className="navbar d-flex justify-content-between navbar-expand-sm sticky-top">
            <div>
                <a className="navbar-brand  ms-2 p-2" href="#">
                    <img src={logo} width={50} height={50}/>Films4Geeks</a>    
            </div>            
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span className="navbar-toggler-icon mt-1">
		        <i className="fas fa-bars"></i>
	         </span>
            </button>
           
           <div className="collapse navbar-collapse mx-0 justify-content-end" id="navbarSupportedContent" role="button">
            <div className="me-2">
            <ul className="navbar-nav m-0">
                    <li className="nav-item active">
                        <Link className="nav-link link-warning " to="/">Home</Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link link-warning" to="/profile">Profile</Link>
                    </li>
                        <li className="nav-item">
                        <Link className="nav-link link-warning" to="/Search">Search</Link>
                    </li>
                    <li className="nav-item">
                            <Link className="nav-link link-warning" to="/starring">Starring</Link>
                    </li> 
                    
                    <li className="nav-item">                   

                            <Link className="nav-link link-warning" to="#" onClick={handleClick}><i className="fa fa-power-off"></i></Link>
                    </li>

                    {theme === 'light' ? ( 
                    <button className="toggle" onClick={toggleTheme}><i className="fas fa-moon"></i></button>
                    ) : (
                    <button className="toggle" onClick={toggleTheme}><i className="fas fa-sun"></i></button>
                    )}
                </ul>
            </div>
           </div>
		</nav>
        ) : (null) }

</>
	);
};

export default Navbar;