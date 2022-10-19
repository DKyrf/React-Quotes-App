import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css"

export default function MainNavigation() {
    return <header className={classes.header}>
        <div className={classes.logo}>
            Danylos Quotes
        </div>

        <nav className={classes.nav}>
            <ul>
                <li> <NavLink className={item => item.isActive ? classes.active : ""} to="/quotes">Quotes</NavLink> </li>
                <li> <NavLink className={item => item.isActive ? classes.active : ""} to="/new-quote">New Quotes</NavLink> </li>
            </ul>
        </nav>
    </header>
};

