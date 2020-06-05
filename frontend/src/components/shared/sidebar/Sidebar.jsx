import React, { useContext } from "react";
import "./Sidebar.scss";
import { AppContext } from "../../../contexts/AppContext";
import Menu from "./menu/Menu";

const Sidebar = () => {
    const { layoutState } = useContext(AppContext);

    return (
        <div
            className={`Sidebar noselect ${
                layoutState.isMenuOpen ? "menu-opened" : ""
            }`}
        >
            <Menu />
        </div>
    );
};

export default Sidebar;
