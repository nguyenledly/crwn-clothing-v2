import { useState } from "react"
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.actions";
import { createAuthUserFromEmailAndPassword } from "../../utils/firebase/firebase.util";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.style.scss";

const SignUp = () => {
    const dispatch = useDispatch();
    const defaultFormData = {
        'displayName': "",
        'email': "",
        'password': "",
        'confirmedPassword': "",
    }
    const [formData, setFormData] = useState(defaultFormData);
    const { displayName, email, password, confirmedPassword } = formData;

    const onInputChange = (event) => {
        const { name, value } = event.target;
        // really cool here
        setFormData({ ...formData, [name]: value });
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const { email, password, confirmedPassword } = formData;
        if (password != confirmedPassword) {
            alert("Password and Confirmed Password do not match!");
            return;
        }
        dispatch(signUpStart(email, password, displayName));
    }
    const onResetForm = () => {
        setFormData(defaultFormData);
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmitForm}>
                <FormInput label={"Display name"} type="text" onChange={onInputChange} name="displayName" value={displayName} required />
                <FormInput label={"Email"} type="email" onChange={onInputChange} name="email" value={email} required />
                <FormInput label={"Password"} type="password" onChange={onInputChange} name="password" value={password} required />
                <FormInput label={"Confirmed password"} type="password" onChange={onInputChange} name="confirmedPassword" value={confirmedPassword} required />
                <Button buttonType={"inverted"} type="submit" children={"SIGN UP"} />
            </form>
        </div>
    )
}

export default SignUp;