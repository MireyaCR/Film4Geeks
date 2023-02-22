import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/LOGO.png";

//include your index.scss file into the bundle
import "../../styles/navbar.css";

const NavbarWelcome = () => {
  const { store, actions } = useContext(Context);

  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    handleClickLink();
  };

  const handleClick = () => {
    navigate("login");
    actions.logout();
  };

  const [collapsed, setCollapsed] = useState(false);

  const handleClickLink = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
    
        <nav className="navbar d-flex justify-content-between navbar-expand-sm sticky-top">
          <div>
            <a className="navbar-brand  ms-2 p-2" href="#">
              <img src={logo} width={50} height={50} />
              Films4Geeks
            </a>
          </div>
          <button
            className={
              !collapsed ? "navbar-toggler collapsed" : "navbar-toggler"
            }
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={collapsed}
            aria-label="Toggle navigation"
            onClick={handleClickLink}
          >
            <span className="navbar-toggler-icon mt-1">
              <i className="fas fa-bars"></i>
            </span>
          </button>

          <div
            className={`${!collapsed ? 'collapse' : ''} navbar-collapse mx-0 justify-content-end`}
            id="navbarSupportedContent"
            role="button"
          >
            <div className="me-2">
              <ul className="navbar-nav m-0">
                <li className="nav-item">
                  <Link className="nav-link link-warning" to="/starring" onClick={handleClickLink}>
                    Starring
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      
    </>
  );
};

export default NavbarWelcome;