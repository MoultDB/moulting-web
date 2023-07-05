import React, {Component} from "react";
import UploadService from "../../services/image.service";
import './upload-files.css';
import {withRouter} from '../../common/with-router';
import AuthService from "../../services/auth.service";
import NotLogIn from "../user/not-log-in";

class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeSpeciesName = this.onChangeSpeciesName.bind(this);
        this.onChangeSex = this.onChangeSex.bind(this);
        this.onChangeAgeInDays = this.onChangeAgeInDays.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeMoultingStep = this.onChangeMoultingStep.bind(this);
        this.onChangeIsFossil = this.onChangeIsFossil.bind(this);
        this.onChangeSpecimenCount = this.onChangeSpecimenCount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            file: undefined,
            speciesName: '',
            specimenCount: '',
            sex: '',
            moultingStep: undefined,
            isFossil: undefined,
            ageInDays: '',
            location: '',
            successful: false,
            fileError: undefined,
            message: undefined
        };

    }

    onChangeFile(event) {
        if (event.target.files) {
            let currentFile = event.target.files[0];
            if (currentFile.size > 1000000) {
                this.setState({fileError: "File must not exceed 1MB."});
            } else if (currentFile.type !== "image/jpeg" && currentFile.type !== "image/png") {
                this.setState({fileError: "File must not be other than JPEG or PNG."});
            } else {
                this.setState({ fileError: undefined });
            }
            this.setState({ file: currentFile });
        }
    }

    onChangeSpeciesName(e) {
        this.setState({ speciesName: e.target.value });
    }

    onChangeSpecimenCount(e) {
        this.setState({ specimenCount: e.target.value });
    }

    onChangeSex(e) {
        this.setState({ sex: e.target.id });
    }

    onChangeMoultingStep(e) {
        this.setState({ moultingStep: e.target.id });
    }

    onChangeIsFossil(e) {
        this.setState({ isFossil: e.target.id });
    }

    onChangeAgeInDays(e) {
        this.setState({ ageInDays: e.target.value });
    }

    onChangeLocation(e) {
        this.setState({ location: e.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const {
            file,
            speciesName,
            sex,
            ageInDays,
            location,
            moultingStep,
            isFossil,
            specimenCount
        } = this.state;

        this.setState({
            successful: false
        });

        UploadService.uploadImage(file, speciesName, sex, ageInDays, location, moultingStep, isFossil, specimenCount)
            .then((response) => {
                this.setState({
                    successful: true,
                    message: response.data.message
                });
            })
            .catch(() => {
                this.setState({
                    successful: false,
                    message: "Could not upload the file!"
                });
            });
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser })
    }

    render() {
        const { currentUser } = this.state;
        let isDisabled = false;

        if (this.state.file === undefined || this.state.file === ''
            || this.state.speciesName === undefined || this.state.speciesName === ''
            || this.state.specimenCount === undefined || this.state.specimenCount === ''
            || this.state.sex === undefined || this.state.sex === ''
            || this.state.moultingStep === undefined || this.state.moultingStep === ''
            || this.state.isFossil === undefined || this.state.isFossil === '') {
            isDisabled = true;
        }
        let buttonClassName = "btn btn-primary btn-block";

        return (
            <main>
                <div className="species">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Upload photo</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {(this.state.currentUser) ?

                    <div className="container">
                        <div className="row">
                            {this.state.message && (
                                <div
                                    className={ this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                    role="alert">
                                    {this.state.message}
                                </div>
                            )}

                            <form onSubmit={this.handleSubmit} >

                                <div className="mb-3">
                                    <label htmlFor="file" className="form-label required">Image file (allowed extensions : png, jpg ; maximum upload file size: 1 MB)</label>
                                    <input className="form-control" type="file" id="file" onChange={this.onChangeFile} required/>
                                    <div className="invalid-feedback">Please provide a file</div>
                                    {this.state.fileError && (
                                        <p className={"text-warning"}>{this.state.fileError}</p>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="speciesname" className="form-label required">Scientific species name</label>
                                    <input type="text" className="form-control" id="speciesname"
                                           value={this.state.speciesName} placeholder="Ex: Arthropoda" onChange={this.onChangeSpeciesName} required/>
                                    <div className="invalid-feedback">Please provide a scientific species name</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="specimencount required" className="form-label required">Specimen count</label>
                                    <input type="number" className="form-control" id="specimencount"
                                           value={this.state.specimenCount} placeholder="Ex: 3" onChange={this.onChangeSpecimenCount} required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="sex" className="form-label required">Sex</label>
                                    {this.getRadioInput("sex", "Hermaphrodite", this.onChangeSex, this.state.sex)}
                                    {this.getRadioInput("sex", "Female", this.onChangeSex, this.state.sex)}
                                    {this.getRadioInput("sex", "Male", this.onChangeSex, this.state.sex)}
                                    {this.getRadioInput("sex", "Unknown", this.onChangeSex, this.state.sex)}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="moultingstep" className="form-label required">Moulting step</label>
                                    {this.getRadioInput("moultingstep", "Pre-moult", this.onChangeMoultingStep, this.state.moultingStep)}
                                    {this.getRadioInput("moultingstep", "Moulting", this.onChangeMoultingStep, this.state.moultingStep)}
                                    {this.getRadioInput("moultingstep", "Post-moult", this.onChangeMoultingStep, this.state.moultingStep)}
                                    {this.getRadioInput("moultingstep", "Inter-moult", this.onChangeMoultingStep, this.state.moultingStep)}
                                    {this.getRadioInput("moultingstep", "Exoskeleton", this.onChangeMoultingStep, this.state.moultingStep)}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="fossil" className="form-label required">Is a fossil</label>
                                    {this.getRadioInput("fossil", "Yes", this.onChangeIsFossil, this.state.isFossil)}
                                    {this.getRadioInput("fossil", "No", this.onChangeIsFossil, this.state.isFossil)}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="ageindays" className="form-label">Age (in days)</label>
                                    <input type="number" className="form-control" id="ageindays"
                                           value={this.state.ageInDays} placeholder="Ex: 5" onChange={this.onChangeAgeInDays} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location (place where the arthropod comes from)</label>
                                    <input type="text" className="form-control" id="location"
                                           value={this.state.location} placeholder="Ex: Switzerland" onChange={this.onChangeLocation} />
                                </div>

                                <button type="submit" className={buttonClassName} disabled={isDisabled}>Submit</button>
                            </form>
                        </div>
                    </div>
                    :
                    <NotLogIn />
                }

            </main>

        );
    }

    getRadioInput(name, text, funct, currentState) {
        const value = text.toLocaleLowerCase();
        return <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name={name} id={value}
                   checked={currentState === value} onChange={funct} required/>
            <label className="form-check-label" htmlFor={value}>{text}</label>
        </div>;
    }
}

export default withRouter(UploadFiles);
