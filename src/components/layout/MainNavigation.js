import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authAction } from "../store/authSlice";
import { useDispatch } from "react-redux";
import classes from "./MainNavigation.module.css"

export default function MainNavigation() {
    const navigate = useNavigate()
    const dispatchFN = useDispatch();

    const authCTX = useSelector(state => state.authReducer);

    const logoutHandler = () => {
        dispatchFN(authAction.logOut());
        navigate("/quotes");
    };

    return <header className={classes.header}>
        <div className={classes.logo}>
            Danylos Quotes
        </div>

        <nav className={classes.nav}>
            <ul>
                <li> <NavLink className={item => item.isActive ? classes.active : ""} to="/quotes"> Quotes </NavLink> </li>
                {authCTX.isLoggedIn && <li> <NavLink className={item => item.isActive ? classes.active : ""} to="/new-quote"> New Quotes </NavLink> </li>}
                {!authCTX.isLoggedIn
                    ? <li> <NavLink className={item => item.isActive ? classes.active : ""} to="/auth_form"> Log In </NavLink> </li>
                    : <li>
                        <button onClick={logoutHandler} className={classes.logOut}>
                            Log Out
                        </button>
                    </li>}
            </ul>
        </nav>
    </header>
};

