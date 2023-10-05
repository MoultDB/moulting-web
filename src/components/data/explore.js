import React from 'react';
import '../user/user-profile.css';
import ImageService from "../../services/image.service";
import DisplayImages from "./display-images";
import {withRouter} from "../../common/with-router";
import ChangePageTitle from "../../common/change-page-title";

class Explore extends React.Component {

    constructor(props) {
        super(props);

        let path;
        if (this.props.router.location.pathname && this.props.router.location.pathname !== "/explore") {
            path = this.props.router.location.pathname
                .substring(this.props.router.location.pathname.lastIndexOf("/")+1)
        }

        this.state = {
            pathname : path,
            currentData: undefined,
            successful: false,
            message: undefined
        };
    }

    componentDidMount() {
        ImageService.getFilesFromTaxon(this.state.pathname)
            .then((response) => {
                this.setState({
                    currentData: response.data.data,
                    successful: true,
                    message: undefined
                });
            })
            .catch(() => {
                this.setState({
                    currentData: undefined,
                    successful: false,
                    message: "Could not upload images!"
                });
            });
    }

    render() {
        const { currentData } = this.state;

        let taxonName = this.state.pathname ? this.state.pathname : "";
        let title = "Explore " + taxonName;
        return <main>
            <ChangePageTitle pageTitle={title} />
            <div className="species">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>{title}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-single bg-custom-dark">
                <div className="container ">
                    <DisplayImages currentUserData={currentData}/>
                </div>
            </div>
        </main>;
    }
}

export default withRouter(Explore);
