import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.actions";
import { selectErrorMapping, selectLoading } from "../../store/user/user.selectors";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.util";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.style.scss";
const SignIn = () => {
    const dispatch = useDispatch();
    const isLoadingSignIn = useSelector(selectLoading);
    const signInError = useSelector(selectErrorMapping);
    const navigate = useNavigate();
    useEffect(() => {
        if (signInError) {
            alert(signInError)
        }
    }, [isLoadingSignIn]);

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
        // await signInWithGooglePopup();
        dispatch(googleSignInStart());
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        dispatch(emailSignInStart(email, password, navigate));
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