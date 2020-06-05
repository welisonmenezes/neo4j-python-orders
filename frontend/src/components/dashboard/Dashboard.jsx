import React, { useContext } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./Dashboard.scss";
import { AppContext } from "../../contexts/AppContext";
import TopBar from "../shared/topbar/TopBar";
import Sidebar from "../shared/sidebar/Sidebar";
import Customers from "../pages/Customers/Customers";
import Orders from "../pages/Orders/Orders";
import Products from "../pages/Products/Products";

const Dashboard = () => {
    const { url } = useRouteMatch();
    const { layoutState, setLayoutState } = useContext(AppContext);

    const closeMenu = () => {
        setLayoutState({ ...layoutState, isMenuOpen: false });
    };

    return (
        <div className={`Dashboard ${layoutState.isMenuOpen ? "menu-opened" : ""}`}>
            <header>
                <TopBar></TopBar>
            </header>
            <section className="d-flex">
                <aside className="nice-transition nt-left-width">
                    <Sidebar></Sidebar>
                </aside>
                <div className="mbl-overlay-menu nice-transition" onClick={closeMenu}></div>
                <main>
                    <Switch>
                        <Route exact path={`${url}/clientes`} component={Customers} />
                        <Route exact path={`${url}/compras`} component={Orders} />
                        <Route exact path={`${url}/produtos`} component={Products} />
                    </Switch>
                </main>
            </section>
        </div>
    );
};

export default Dashboard;
