import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoading } from "../../store/user/user.selectors";
import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up-form/sign-up-form.component";
import Spinner from "../spinner/spinner.component";
import "./authentication.style.scss";
const Authentication = () => {
    const isLoadingSignIn = useSelector(selectLoading);
    return (
        <Fragment>
            {
                isLoadingSignIn
                    ? (<Spinner />)
                    : (<div className="authentication-container">
                        <SignIn />
                        <div className="middle-container"></div>
                        <SignUp />
                    </div>)
            }
        </Fragment>
    )
}
export default Authentication;