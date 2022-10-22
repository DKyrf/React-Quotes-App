import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

export default function Layout() {

    return <Fragment>
        <MainNavigation />
        <main className={classes.main}>
            <Outlet />
        </main>
    </Fragment>
};