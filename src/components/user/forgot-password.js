import React, {Component} from 'react';
import AuthService from "../../services/auth.service";
import {withRouter} from '../../common/with-router';
import {isEmail} from "validator";
import ChangePageTitle from "../../common/change-page-title";

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.handleSend = this.handleSend.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            email: "",
            successful: false,
            emailError: "",
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

    handleSend (event) {
        event.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        AuthService.forgotPassword(this.state.email).then(
            () => {
                this.setState({
                    successful: true,
                    message: "New password asked, check your mailbox to be able to update your account."
                });
            },
            error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message)
                    || error.message
                    || error.toString();

                this.setState({
                    successful: false,
                    message: "New password is NOT asked. Please contact our support team for assistance.\nError: " + resMessage
                });
            }
        );
    }

    render() {
        let isDisabled = false;
        if (!isEmail(this.state.email)) {
            isDisabled = true;
        }

        return (
            <main>
                <ChangePageTitle pageTitle="New password" />
                <div className="container">
                    <div className="row">
                        <h1>Ask for new password</h1>
                        <div className="col-sm-10 col-sm-offset-1">
                            {this.state.message && (
                                <div
                                    className={ this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                    role="alert">
                                    {this.state.message}
                                </div>
                            )}
                            <form onSubmit={this.handleSend}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label required">E-mail</label>
                                    <input type="text" name="email" className="form-control"
                                           value={this.state.email} onChange={this.onChangeEmail} />
                                    {this.state.emailError && (
                                        <p className={"text-warning"}>{this.state.emailError}</p>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={isDisabled} >Ask password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(ForgotPassword);
