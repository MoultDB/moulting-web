import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AuthService from "../../services/auth.service";
import {withRouter} from '../../common/with-router';


class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        const message = this.props.router.location.state ? this.props.router.location.state.message : "";
        const error = this.props.router.location.state ? this.props.router.location.state.error : "";

        this.state = {
            email: "",
            password: "",
            loading: false,
            error: error? error : false,
            message: message? message : ""
        };
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleLogin (event) {
        event.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(this.state.email, this.state.password).then(
            () => {
                this.props.router.navigate("/user/profile");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message)
                    || error.message
                    || error.toString();

                this.setState({
                    loading: false,
                    message: resMessage,
                    error:  true
                });
            }
        );
    }

    render() {

        let messageClass = "alert alert-success";
        if (this.state.error) {
            messageClass = "alert alert-danger"
        }

        return (
            <main>
                <div className="container">
                    <div className="row">
                        <div className="description">
                            <h1> Log in to MoultDB </h1>
                            <div className="col-sm-10 col-sm-offset-1">
                                {(this.state.message) &&
                                    <div className={messageClass} role="alert">
                                        {this.state.message}
                                    </div>
                                }

                                <form onSubmit={this.handleLogin}>
                                    <p>
                                        <label>E-mail address</label>
                                        <input type="text" value={this.state.email} onChange={this.onChangeEmail}/>
                                    </p>
                                    <p>
                                        <label>Password</label>
                                        <input type="password" value={this.state.password} onChange={this.onChangePassword}/>
                                    </p>
                                    <button type="submit">Log in</button>
                                    <Link to="/user/forgot-password">Forgot password?</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(Login);
