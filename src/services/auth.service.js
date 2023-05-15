
class AuthService {

    login(email, password) {
        return fetch(process.env.REACT_APP_API_URL + "/user/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"email": email, "password": password})
        })
            .then(response => response.json())
            .then(response => {
                if (response.token) {
                    localStorage.setItem("user", JSON.stringify({token: response.token, email: email}));
                }
                return response.token;
            })
            .catch(error =>
                console.error(error)
            );
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
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
