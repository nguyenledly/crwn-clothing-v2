// import { createBrowserHistory } from "history"
// const history = createBrowserHistory();
import { useNavigate } from "react-router-dom";

export const ForwardTo = (url) => {
    const navigate = useNavigate();
    navigate(url);
    console.log(123);
}