import React from "react";
import "./Loader.scss";
import load from "../../../images/loader.gif"

const Loader = () => {
    return (
        <div className="Loader">
            <img src={load} alt="loading..."/>
        </div>
    );
}

export default Loader;
