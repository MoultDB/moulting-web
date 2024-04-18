import React, {Component} from 'react';
import AuthService from "../../services/auth.service";
import {withRouter} from '../../common/with-router';
import {isEmail} from "validator";
import ChangePageTitle from "../../common/change-page-title";


const isValidatedName = value => {
    return (value.length > 3);
};

const isValidatedPassword = value => {
    return (value.length >= 8 && value.length <= 20);
};

class Registration extends Component {

    constructor(props) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeOrcidId = this.onChangeOrcidId.bind(this);

        this.state = {
            email: "",
            name: "",
            password: "",
            orcidId: "",
            successful: false,
            emailError: "",
            nameError: "",
            pwdError: "",
            message: ""
        };
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

    onChangeName(e) {
        if (!e.target.value) {
            this.setState({ nameError: "Name is mandatory."});
        } else if (!isValidatedName(e.target.value)) {
            this.setState({ nameError: "Invalid name, length should be more than 3 characters." });
        } else {
            this.setState({ nameError: undefined });
        }
        this.setState({ name: e.target.value });
    }

    onChangeOrcidId(e) {
        this.setState({ orcidId: e.target.value });
    }

    handleSignUp (event) {
        event.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        AuthService.register(this.state.name, this.state.email, this.state.password, this.state.orcidId).then(
            (response) => {
                if (response.error) {
                    this.setState({
                        successful: false,
                        message: "Your account is NOT created. Please contact our support team for assistance.\nError: "
                            + response.error.message
                    });

                } else {
                    this.setState({
                        successful: true,
                        message: "User created, check your mailbox to activate your account."
                    });
                }
            },
            error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message)
                    || error.message
                    || error.toString();

                this.setState({
                    successful: false,
                    message: "Your account is NOT created. Please contact our support team for assistance.\nError: " + resMessage
                });
            }
        );
    }

    render() {
        let isDisabled = false;
        let buttonClassName = "btn btn-primary btn-block";

        // Disabled sign up button if values are empty or
        if (!isValidatedName(this.state.name) || !isEmail(this.state.email) || !isValidatedPassword(this.state.password)) {
            isDisabled = true;
            buttonClassName = "btn btn-secondary btn-block"
        }

        return (
            <main>
                <ChangePageTitle pageTitle="Registration" />
                <div className="container">
                    <div className="row">
                            <h1>Sign up to MoultDB</h1>
                            <div className="col-sm-10 col-sm-offset-1">
                                {this.state.message && (
                                        <div
                                            className={ this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                            role="alert">
                                            {this.state.message}
                                        </div>
                                )}
                                <form onSubmit={this.handleSignUp}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label required">E-mail</label>
                                        <input type="text" name="email" className="form-control"
                                               value={this.state.email} onChange={this.onChangeEmail} />
                                        {this.state.emailError && (
                                            <p className={"text-warning"}>{this.state.emailError}</p>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label required">Name</label>
                                        <input type="text" name="name" className="form-control"
                                               value={this.state.name} onChange={this.onChangeName} />
                                        {this.state.nameError && (
                                            <p className={"text-warning"}>{this.state.nameError}</p>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="orcidid" className="form-label">ORCID iD</label>
                                        <input type="text" name="orcidid" className="form-control"
                                               value={this.state.orcidId} onChange={this.onChangeOrcidId} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label required">Password</label>
                                        <input type="password" name="password" className="form-control"
                                               value={this.state.password} onChange={this.onChangePassword} />
                                        {this.state.pwdError && (
                                            <p className={"text-warning"}>{this.state.pwdError}</p>
                                        )}
                                    </div>
                                    <button type="submit" className={buttonClassName} disabled={isDisabled} >Sign up</button>
                                </form>
                            </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(Registration);
