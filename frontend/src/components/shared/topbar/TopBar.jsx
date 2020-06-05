import React, { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import "./TopBar.scss";

const TopBar = () => {
    const { layoutState } = useContext(AppContext);

    return (
        <div
            className={`TopBar d-flex align-items-center ${
                layoutState.isMenuOpen ? "menu-opened" : ""
            }`}
        ></div>
    );
};

export default TopBar;
