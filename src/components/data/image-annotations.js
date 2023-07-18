import React from 'react';
import './image-annotations.css';
import ImageService from "../../services/image.service";
import {withRouter} from "../../common/with-router";

class ImageAnnotations extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pathname : this.props.router.location.pathname ?
                this.props.router.location.pathname.split("/").pop() : undefined,
            currentData: undefined,
            successful: false,
            message: undefined
        };
    }

    componentDidMount() {

        ImageService.getFilesFromImageFilename(this.state.pathname)
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

    render() {
        const { currentData, successful, message } = this.state;
        ;
        return <main>
            <div className="species">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Data</h1>
                        </div>
                    </div>
                </div>
            </div>
            {currentData &&
                <div className="page-single bg-custom-dark">
                    <div className="container image-annotations">

                        {/*<img className={"col-sm-3"} src={currentData.imageInfo.url} alt={currentData.imageInfo.name} />*/}
                        {/*<ul  className={"col-sm-9"}>*/}
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
                    </div>
                </div>
            }
        </main>;
    }
}

export default withRouter(ImageAnnotations);
