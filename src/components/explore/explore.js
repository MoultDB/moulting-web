import React from 'react';
import '../user/user-profile.css';
import ImageService from "../../services/image.service";
import DisplayImages from "../data/display-images";

export default class Explore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentData: undefined,
            successful: false,
            message: undefined
        };
    }

    componentDidMount() {
        ImageService.getFiles()
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
        const { currentData, successful, message } = this.state;

        return <main>
            <div className="species">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Explore</h1>
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

