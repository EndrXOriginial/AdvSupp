import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function NavComp() {
    return (
        <div className="nav">
            <nav className="navWrapper">
                <ul className="navUl">
                    <li className="navLi"><NavLink to='/products'>Products</NavLink></li>
                    <li className="navLi"><NavLink to='/ingredients'>Ingredients</NavLink></li>
                    <li className="navLi"><NavLink to='/potions'>Potions</NavLink></li>
                    <li className="navLi"><NavLink to='/profile'>profile</NavLink></li>
                </ul>
            </nav>
            <Outlet/>
            <footer className="footer">
                <p>This is a fictional company and nothing you see is real.</p>
            </footer>
        </div>

    )
}