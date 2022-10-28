import { useState, useRef } from "react";
import { authAction } from "../components/store/authSlice";
import { AuthHandler } from "../components/hooks/use-http"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const authStatus = useSelector(state => state.authReducer);

    const dispatchFN = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const toggleHandler = () => {
        setIsLoggedIn(prev => !prev)
    };

    const submitAuth = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        let url;

        if (isLoggedIn) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`
        };

        const res = await AuthHandler(url, {
            emailRef,
            passwordRef
        });

        if (res.status === "ERR" && !res.token) {
            setIsLoading(false);
            dispatchFN(authAction.setErrorMessege(res.message))
        } else {
            setIsLoading(false);
            dispatchFN(authAction.logIn(res.token));
            navigate("/");
        };


    }

    return (
        <section className={classes.auth}>
            <h1>{isLoggedIn ? "Login" : "Sign UP"}</h1>
            {authStatus.error && <h3 className="centered" style={{ color: "red", margin: "0.5rem" }}> {`( ${authStatus.error} )`} </h3>}
            <form onSubmit={submitAuth}>
                <div className={classes.input_control}>
                    <label htmlFor="email">Your Email</label>
                    <input ref={emailRef} type="email" id="email" name="email" required />
                </div>
                <div className={classes.input_control}>
                    <label htmlFor="password"> Your Password</label>
                    <input ref={passwordRef} type="password" id="password" name="password" required />
                </div>
                <div className={classes.input_action}>
                    {!isLoading ?
                        <>
                            <button className={classes.button}>
                                {isLoggedIn ? "Login" : "Create Account"}
                            </button>
                            <button className={classes.button_toggler} onClick={toggleHandler}>
                                {isLoggedIn ? "Create new account" : "Login with existing account"}
                            </button>
                        </>
                        : <LoadingSpinner className="centered" />}
                </div>
            </form>
        </section>
    )
};

export default AuthForm;