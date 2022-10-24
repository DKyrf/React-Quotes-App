import { useState, useRef } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
// import { authUser } from "../components/hooks/use-http"
import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    const toggleHandler = () => {
        setIsLoggedIn(prev => !prev)
    };

    const submitAuth = (event) => {
        event.preventDefault();

        let url;

        setIsLoading(true);

        if (isLoggedIn) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2EGbmA_S4qaFcPtzgzq2rD9BrMnU-JI0"
        } else {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2EGbmA_S4qaFcPtzgzq2rD9BrMnU-JI0"
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            setIsLoading(false)
            if (response.ok) {
                console.log("response >>> ", response);
                return response.json()
            } else {
                return response.json().then(data => {
                    let errorMessage = "Authentication failed!";
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message
                    };
                    alert(errorMessage);
                })
            }
        }).then(data => {
            emailRef.current.value = "";
            passwordRef.current.value = "";

            //data about tokens etc.
            console.log(data);
        }).catch(error => {
            alert(error.message)
        });

    }


    return (
        <section className={classes.auth}>
            <h1>{isLoggedIn ? "Login" : "Sign UP"}</h1>
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

// export async function authenticate(obj) {
//     const formData = await obj.request.formData();
//     const user = {
//         email: formData.get("email"),
//         password: formData.get("password"),
//     };
//     try {
//         await authUser(user);
//     } catch (error) {
//         throw new Error("Something went wrong!")
//     }
// };