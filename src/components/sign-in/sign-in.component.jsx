import { useContext, useEffect, useState } from "react";
import { auth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createUserToFireStore } from "../../utils/firebase/firebase.util";
import { getRedirectResult } from "firebase/auth";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.style.scss";
import { UserContext } from "../../contexts/user.context";
const SignIn = () => {
    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     console.log(response);
    //     if (response) {
    //         const user = await createUserToFireStore(response.user);
    //         console.log(user);
    //     }
    // }, [])
    const defaultFormData = {
        'email': "",
        'password': "",
    }
    const [formData, setFormData] = useState(defaultFormData);
    const { email, password } = formData;
    const onInputChange = (event) => {
        const { name, value } = event.target;
        // really cool here
        setFormData({ ...formData, [name]: value });
    }
    const onResetForm = () => {
        setFormData(defaultFormData);
    }

    const signinGoogleUser = async () => {
        await signInWithGooglePopup();
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            onResetForm();
        } catch (error) {
            if (['auth/wrong-password', "auth/user-not-found"].includes(error.code)) {
                alert("Email or password is invalid!");
            }
            console.log(error);
        }
    }
    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitForm}>
                <FormInput label={"Email"} type="email" onChange={onInputChange} name="email" value={email} required />
                <FormInput label={"Password"} type="password" onChange={onInputChange} name="password" value={password} required />
                <div className="sign-in-button-container">
                    <Button children={"SIGN IN"} type="submit" />
                    <Button type="button" buttonType={'google'} children={"GOOGLE SIGN IN"} onClick={signinGoogleUser} />
                </div>
            </form>
        </div>
    )
}
export default SignIn;