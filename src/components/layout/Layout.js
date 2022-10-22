import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

export default function Layout() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/quotes")
    }, [navigate])

    return <Fragment>
        <MainNavigation />
        <main className={classes.main}>
            <Outlet />
        </main>
    </Fragment>
};