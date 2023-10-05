import React from 'react';
import './image-annotations.css';
import ImageService from "../../services/image.service";
import {withRouter} from "../../common/with-router";
import AuthService from "../../services/auth.service";
import ChangePageTitle from "../../common/change-page-title";

class ImageAnnotations extends React.Component {

    constructor(props) {
        super(props);
        this.deleteTaxAnnot = this.deleteTaxAnnot.bind(this);

        this.state = {
            pathname : this.props.router.location.pathname ?
                this.props.router.location.pathname.split("/").pop() : undefined,
            currentData: undefined,
            successful: false,
            message: undefined,
            currentUser: undefined
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser })

        ImageService.getTaxAnnotationsFromImageFilename(this.state.pathname)
            .then((response) => {
                this.setState({
                    currentData: response.data.data,
                    successful: true,
                    message: undefined
                });
            })
            .catch(function(error) {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message)
                    || error.message
                    || error.toString();

                this.setState({
                    currentData: undefined,
                    successful: false,
                    message: "Could not upload the image annotations!\nError: " + resMessage
                });
            });
    }

    deleteTaxAnnot(imageFilename) {
        ImageService.deleteTaxAnnotationsFromImageFilename(imageFilename)
            .then((response) => {
                this.setState({
                    currentData: undefined,
                    successful: true,
                    message: "Image deleted!"
                });
            })
            .catch(function(error) {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message)
                    || error.message
                    || error.toString();

                this.setState({
                    currentData: undefined,
                    successful: false,
                    message: "Could not delete the image!\nError: " + resMessage
                });
            });
    }


    render() {
        const { currentData, successful, message, currentUser} = this.state;
        let messageClassName = "alert alert-danger";
        if (successful) {
            messageClassName = "alert alert-success";
        }


        return <main>
            <ChangePageTitle pageTitle="Data" />
            <div className="species">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Data</h1>
                        </div>
                    </div>
                </div>
            </div>
                <div className="page-single bg-custom-dark">
                    {currentData &&
                        <div className="container image-annotations">
                            <img  src={currentData.imageInfo.url} alt={currentData.imageInfo.name} />
                            <ul >
                                <li>Scientific name: {currentData.taxon.scientificName}</li>
                                <li>Sex: {currentData.condition.sex}</li>
                                <li>Moulting step: {currentData.condition.moultingStep}</li>
                                <li>In captivity? {currentData.sampleSet.captive? "Yes" : "No"}</li>
                                <li>Is a fossil? {currentData.sampleSet.fossil? "Yes" : "No"}</li>
                                <li>Created by: {currentData.version.creationUser.name}</li>
                                <li>Creation date: {currentData.version.creationDate}</li>
                            </ul>
                            {currentUser && currentUser.email === currentData.version.creationUser.email &&
                                <button className={"btn btn-danger "}
                                        onClick={() => this.deleteTaxAnnot(currentData.imageInfo.id)}>
                                    DELETE
                                </button>
                            }
                        </div>
                    }
                    {message &&
                        <div className={"container " + messageClassName} role="alert">
                            {message}
                        </div>
                    }
                </div>
        </main>;
    }
}

export default withRouter(ImageAnnotations);
