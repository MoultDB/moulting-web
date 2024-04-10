import React from 'react';
import './hero.css';
import { Link } from "react-router-dom";
import chelicherata from "../../assets/images/uploads/main_slider/chelicherata.jpg";
import myriapoda from "../../assets/images/uploads/main_slider/myriapoda.jpg";
import crostacea from "../../assets/images/uploads/main_slider/crostacea.jpg";
import hexapoda from "../../assets/images/uploads/main_slider/hexapoda.jpg";
import Slider from "react-slick";
import AuthService from "../../services/auth.service";
import SocialLinks from "../common/social-links";
import ImageService from "../../services/image.service";

class TaxonItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: undefined
        };

    }

    componentDidMount() {
        if (this.props.taxonName) {
            ImageService.getFilesFromTaxon(this.props.taxonName)
                .then((response) => {
                    this.setState({
                        files: response.data.data
                    });
                })
                .catch(() => {
                    this.setState({
                        files: undefined
                    });
                });
        }
    }

    render() {
        let {src, taxonName} = this.props;
        let {files} = this.state;
        let speciesCount = 0;
        if (files) {
            speciesCount = files.length;
        }

        const href = "/explore/" + taxonName;
        return <div className="photo-item">
            {/*<Link to={href}>*/}
                <div className="ph-img">
                    <img src={src} alt={taxonName}/>
                </div>
                <div className="title-in">
                    <h6>{taxonName}</h6>
                    {/*<p><span>{speciesCount}</span> photos uploaded</p>*/}
                </div>
            {/*</Link>*/}
        </div>
    }
}

const HeroSlider = () => {
    const settings = {
        slidesToShow: 4,
        dots: false,
        autoplay: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };
    return (
        <div className="hero-slider">
            <Slider {...settings}>
                <TaxonItem src={chelicherata} taxonName={"Chelicerata"}/>
                <TaxonItem src={myriapoda} taxonName={"Myriapoda"}/>
                <TaxonItem src={crostacea} taxonName={"Crustacea"}/>
                <TaxonItem src={hexapoda} taxonName={"Hexapoda"}/>
            </Slider>
        </div>
    );
}

export default class Hero extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser })
    }

    render() {
        return <div className="slider photo-items">
            <div className="container">
                <div className="row">
                    <div className="social-link">
                        <p>Follow us: </p>
                        <SocialLinks />
                    </div>

                    <div className="description">
                        <h1> Contribute to Science! </h1>
                        This is a citizen science project to gather information on arthropod moulting. You will
                        become a nature reporter, posting photos, videos or any kind of information you can glean
                        about this fashinating process. As part of this community and working together towards the
                        same goal, all the information are posted online, acknowledging the reporter who contributed
                        the data.
                    </div>

                    <HeroSlider />

                    <div className="hero-button">
                        <a href={"https://www.inaturalist.org/projects/arthropods-moulting-exuviae-in-the-world"}
                           rel={"noopener noreferrer"} target={"_blank"}>Let's start</a>
                    </div>

                </div>
            </div>
        </div>;
    }
}
