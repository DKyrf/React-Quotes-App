import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newQuoteAction } from "../store/newQuoteSlice";

export default function useValidator() {

    const dispatchFN = useDispatch();
    const { author, text, isValid, authTouched, textTouched } = useSelector(state => state.newQuoteReducer);

    useEffect(() => {
        if (author.trim() !== "" && text.trim() !== "") {
            dispatchFN(newQuoteAction.setValid(true))
        } else {
            dispatchFN(newQuoteAction.setValid(false))
        }
    }, [dispatchFN, author, text]);

    const authChangeHandler = (element) => {
        dispatchFN(newQuoteAction.setAuth(element.target.value))
    };

    const textChangeHandler = (element) => {
        dispatchFN(newQuoteAction.setText(element.target.value))
    };

    const authorBlur = () => {
        dispatchFN(newQuoteAction.authBlurHandler())
    };

    const textBlur = () => {
        dispatchFN(newQuoteAction.textBlurHandler())
    };

    const authValid = authTouched && author.trim() === "" && !isValid;
    const textValid = textTouched && text.trim() === "" && !isValid;

    return {
        authChangeHandler,
        textChangeHandler,
        authorBlur,
        textBlur,
        authValid,
        textValid,
    }
};
