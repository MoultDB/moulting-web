import React, {Component} from 'react';
import AuthService from "../../services/auth.service";
import {withRouter} from '../../common/with-router';
import {isEmail} from "validator";
import ChangePageTitle from "../../common/change-page-title";

const isValidatedPassword = value => {
    return (value.length >= 8 && value.length <= 20);
};

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : this.props.router.searchParams.get("email"),
            token : this.props.router.searchParams.get("token"),
            password : undefined,
            successful: false,
            emailError: "",
            pwdError: "",
            message: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeEmail(e) {
        if (!e.target.value) {
            this.setState({ emailError: "E-mail is mandatory."});
        } else if (!isEmail(e.target.value)) {
            this.setState({ emailError: "Invalid e-mail."});
        } else {
            this.setState({ emailError: undefined });
        }
        this.setState({ email: e.target.value });
    }

    onChangePassword(e) {
        if (!e.target.value) {
            this.setState({ pwdError: "Password is mandatory."});
        } else if (!isValidatedPassword(e.target.value)) {
            this.setState({ pwdError: "Your password must be 8-20 characters long." });
        } else {
            this.setState({ pwdError: undefined });
        }
        this.setState({ password: e.target.value });
    }


    handleSubmit (event) {
        event.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        AuthService.resetPassword(this.state.email, this.state.password, this.state.token).then(
            () => {
                this.setState({
                    successful: true,
                    message: "Password is updated, you can log in"
                });
            },
            error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message)
                    || error.message
                    || error.toString();

                this.setState({
                    successful: false,
                    message: "Your password is NOT updated. Please contact our support team for assistance.\nError: " + resMessage
                });
            }
        );
    }

    render() {
        let isDisabled = false;

        if (this.state.email === undefined || this.state.email === ''
            || this.state.password === undefined || this.state.password === '') {
            isDisabled = true;
        }
        return (
            <main>
                <ChangePageTitle pageTitle="Reset password" />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <h1> Reset password </h1>
                            <div className="col-sm-10 col-sm-offset-1">
                                {this.state.message && (
                                    <div
                                        className={ this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                        role="alert">
                                        {this.state.message}
                                    </div>
                                )}

                                <form onSubmit={this.handleSubmit}>
                                    <p>
                                        <label htmlFor="email" className="form-label">E-mail</label>
                                        <input type="text" name="email" className="form-control"
                                               value={this.state.email} onChange={this.onChangeEmail}/>
                                        {this.state.emailError && (
                                            <p className={"text-warning"}>{this.state.emailError}</p>
                                        )}
                                    </p>
                                    <p>
                                        <label htmlFor="password" className="form-label ">New password</label>
                                        <input type="password" name="password" className="form-control"
                                               value={this.state.password} onChange={this.onChangePassword}/>
                                        {this.state.pwdError && (
                                            <p className={"text-warning"}>{this.state.pwdError}</p>
                                        )}
                                    </p>
                                    <button type="submit" className="btn btn-primary btn-block" disabled={isDisabled}>Update password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(ResetPassword);
