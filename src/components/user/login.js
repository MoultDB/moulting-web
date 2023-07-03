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
        ).catch(error => {
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

        return (
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <h1> Log in to MoultDB </h1>
                            <div className="col-sm-10 col-sm-offset-1">
                                {(this.state.message) &&
                                    <div className={"alert alert-danger"} role="alert">
                                        {this.state.message}
                                    </div>
                                }

                                <form onSubmit={this.handleLogin}>
                                    <p>
                                        <label htmlFor="email" className="form-label">E-mail</label>
                                        <input type="text" name="email" className="form-control"
                                               value={this.state.email} onChange={this.onChangeEmail}/>
                                    </p>
                                    <p>
                                        <label htmlFor="password" className="form-label ">Password</label>
                                        <input type="password" name="password" className="form-control"
                                               value={this.state.password} onChange={this.onChangePassword}/>
                                    </p>
                                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                                    {/*<Link to="/user/forgot-password">Forgot password?</Link>*/}
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
