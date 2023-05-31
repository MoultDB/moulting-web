import React, { useEffect } from "react";
import {withRouter} from '../common/with-router';
import AuthService from "./auth.service";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    let location = props.router.location;

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            const decodedJwt = parseJwt(user.token);

            if (decodedJwt.exp * 1000 < Date.now()) {
                AuthService.logout();
            }
        }
    }, [location]);

    return <div></div>;
};

export default withRouter(AuthVerify);
