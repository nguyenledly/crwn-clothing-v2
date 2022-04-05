import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up-form/sign-up-form.component";
import "./authentication.style.scss";
const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignIn />
            <div className="middle-container"></div>
            <SignUp />
        </div>
    )
}
export default Authentication;