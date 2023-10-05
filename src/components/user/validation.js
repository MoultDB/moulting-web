import React, {Component} from 'react';
import AuthService from "../../services/auth.service";
import {withRouter} from '../../common/with-router';
import ChangePageTitle from "../../common/change-page-title";

class Validation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : this.props.router.searchParams.get("email"),
            token : this.props.router.searchParams.get("token"),
            successful: false,
            message: ""
        };
    }

    componentDidMount() {

        this.setState({
            message: "",
            successful: false
        });

        AuthService.validation(this.state.email, this.state.token).then(
            () => {
                this.setState({
                    successful: true,
                    message: "E-mail is validated, you can log in"
                });
            },
            error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message)
                    || error.message
                    || error.toString();

                this.setState({
                    successful: false,
                    message: "Your e-mail is NOT validated. Please contact our support team for assistance.\nError: " + resMessage
                });
            }
        );
    }

    render() {
        return (
            <main>
                <ChangePageTitle pageTitle="Account validation" />
                <div className="container">
                    <div className="row">
                        <h1>MoultDB account validation</h1>
                        <div className="col-sm-10 col-sm-offset-1">
                            <div
                                className={ this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default withRouter(Validation);
