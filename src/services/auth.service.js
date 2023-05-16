import axios from "axios";

class AuthService {

    login(email, password) {
        return axios
            .post(process.env.REACT_APP_API_URL + "/user/login",
                {"email": email, "password": password})
            .then(response => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, email, password, orcidId) {
        return fetch(process.env.REACT_APP_API_URL + "/user/registration", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"email": email, "name": name, "password": password, "orcidId": orcidId })
        })
            .then(response => response.json())
            // .then(response => {
            //     if (response.token) {
            //         localStorage.setItem("user", JSON.stringify({token: response.token, email: email}));
            //     }
            //     return response.token;
            // })
            .catch(error =>
                console.error(error)
            );
    }

    getCurrentUser() {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user')).data;
        }
        return null;
    }
}

export default new AuthService();
