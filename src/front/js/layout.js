import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import  Home  from "./pages/Home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import  Navbar  from "./component/Navbar.jsx";
import { Footer } from "./component/footer";

import { Login } from "./pages/Login.jsx";
import { SignUp } from "./pages/SignUp.jsx";

import { Profile } from "./pages/Profile.jsx";

import { Details } from "./pages/Details.js";  //Borrar antes de pushear

import { DetailsFavourites } from "./pages/DetailsFavourites.js";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Login/>} path="/login"/>
                        <Route element={<SignUp/>} path="/signup" />
                        <Route element={<Profile/>} path="/profile"/>
                        <Route path="/details/:index" element={<Details />} /> {/* /*Borrar antes de pushear/* */}
                        <Route path="/details_favourites/:index" element={<DetailsFavourites />} /> {/* /*Borrar antes de pushear/* */}
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
