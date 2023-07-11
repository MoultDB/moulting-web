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
    }

    checkTokenValidity(email, token) {
        let currentUser = this.getCurrentUser();
        if (currentUser) {
             fetch(process.env.REACT_APP_API_URL + "/user/check-token?email=" + currentUser.email
                 + "&token=" + currentUser.token, {
                method: 'GET'
            })
                .then(response => response.json())
                 .then(response => {
                     if (!response.data || !response.data.valid) {
                         localStorage.removeItem("user");
                     }
                 })
        }
    }

    getCurrentUser() {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user')).data;
        }
        return null;
    }

    validation(email, token) {
        return fetch(process.env.REACT_APP_API_URL + "/user/email-validation?email=" + email + "&token=" + token, {
            method: 'GET'
        })
            .then(response => response.json())
    }

    resetPassword(email, password, token) {
        return fetch(process.env.REACT_APP_API_URL + "/user/reset-password", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"email": email, "password": password, "token": token })
        })
            .then(response => response.json())
    }

    forgotPassword(email) {
        return fetch(process.env.REACT_APP_API_URL + "/user/ask-password?email=" + email, {
            method: 'GET'
        })
            .then(response => response.json())
    }
}

export default new AuthService();
