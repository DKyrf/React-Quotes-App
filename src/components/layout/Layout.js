import { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

export default function Layout() {

    return <Fragment>
        <MainNavigation />
        <Navigate to={"/quotes"} />
        <main className={classes.main}>
            <Outlet />
        </main>
    </Fragment>
};