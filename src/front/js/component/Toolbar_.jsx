import React, {useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";

const Toolbar_ = () => {
    return (
        <div className="container">
            <span className="fas fa-check-circle p-2"></span>
              <span className="fas fa-star p-2 "></span>
              <span className="fas fa-flag p-2 "></span>
        </div>
    )
}

export default Toolbar_