import React from 'react';
import AuthService from "../../services/auth.service";
import './user-profile.css';
import NotLogIn from "./not-log-in";
import ImageService from "../../services/image.service";
import DisplayImages from "../data/display-images";

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
            currentUserData: undefined,
            successful: false,
            message: undefined
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser })

        if (currentUser) {
            ImageService.getFiles(currentUser.email)
                .then((response) => {
                    this.setState({
                        successful: true,
                        currentUserData: response.data.data
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                        message: "Could not upload the file!",
                        currentUserData: undefined
                    });
                });
        }
    }

    render() {
        const { currentUser, currentUserData, successful, message } = this.state;

        return <main>
            <div className="species">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>User Profile</h1>
                        </div>
                    </div>
                </div>
            </div>
            {(currentUser) ?
                <div className="page-single bg-custom-dark">
                    <div className="container ">
                        <p><strong>E-mail:</strong>{" "}{currentUser.email} </p>
                        <p><strong>Name:</strong>{" "}{currentUser.name} </p>
                        <p><strong>ORCID iD:</strong>{" "}{currentUser.orcidId} </p>
                        <p><strong>Token:</strong>{" "}{currentUser.token}</p>

                        {message && !successful(
                            <div className={"alert alert-danger"} role="alert">{message}</div>
                        )}

                        <DisplayImages currentUserData={currentUserData}/>
                    </div>
                </div>
                :
                <NotLogIn />
            }
        </main>;
    }
}

