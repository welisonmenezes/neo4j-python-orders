import React, { useContext } from "react";
import { useRouteMatch, NavLink } from "react-router-dom";
import {
    IoMdPeople,
    IoMdPricetag,
    IoIosCube
} from "react-icons/io";
import "./Menu.scss";
import { AppContext } from "../../../../contexts/AppContext";

const Menu = () => {
    const { url } = useRouteMatch();
    const { layoutState, setLayoutState } = useContext(AppContext);

    const closeMenu = (e) => {
        const { innerWidth: width } = window;
        if (width <= 992) {
            setLayoutState({ ...layoutState, isMenuOpen: false });
        }
    };

    return (
        <ul className="Menu">
            <li>
                <NavLink
                    to={`${url}/clientes`}
                    onClick={closeMenu}
                    activeClassName="active"
                >
                    <IoMdPeople /> <span>Clientes</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={`${url}/produtos`}
                    onClick={closeMenu}
                    activeClassName="active"
                >
                    <IoIosCube /> <span>Produtos</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={`${url}/compras`}
                    onClick={closeMenu}
                    activeClassName="active"
                >
                    <IoMdPricetag /> <span>Compras</span>
                </NavLink>
            </li>
        </ul>
    );
};

export default Menu;
