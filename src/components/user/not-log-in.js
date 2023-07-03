import {Link} from "react-router-dom";

export default function NotLogIn() {
    return <div className="container">
        <div className="row">
            <p><strong>You are not log in</strong></p>
            <p>To log in: <Link to={"/user/login"}>log in</Link></p>
            <p>To sign up: <Link to={"/user/registration"} className={" signupLink"}>sign up</Link></p>
        </div>
    </div>;
}
